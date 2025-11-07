import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, share, throwError } from 'rxjs';

// Move to types directory
export interface ListItem {
  ingredient_id: string;
  name: string;
  checked: boolean;
  units: {
    recipe_id: string;
    recipe_name: string;
    quantity: number;
    unit: string;
  }[];
  displayUnits?: string;
}

function parseList(list: ListItem[]): ListItem[] {
  // add displayUnits to list
  const units = new Map();
  for (const item of list) {
    for (const { unit, quantity } of item.units) {
      const currentValue = units.get(unit) ?? 0;
      units.set(unit, currentValue + quantity);
    }

    item.displayUnits = Array.from(units.entries())
      .map((u) => u.reverse().join(' '))
      .flat()
      .join(' | ');

    units.clear();
  }
  return list;
}

@Injectable({
  providedIn: 'root',
})
export class ListService {
  httpClient = inject(HttpClient);
  list = httpResource<ListItem[]>(() => `${API_URL}/list`, {
    defaultValue: [],
    parse(value: any) {
      // Need to use any above otherwise throws error
      return parseList(value);
    },
  });

  private listSse = new Observable((observer) => {
    const url = `${API_URL}/list/sse`;
    const es = new EventSource(url);

    es.onmessage = ({ data }) => {
      observer.next(data);
    };

    es.onerror = (err) => {
      observer.error(err);
    };

    return () => {
      es.close();
    };
  }).pipe(share());

  private startSse() {
    const subscribe = () => {
      this.listSse.subscribe({
        next: (data) => {
          console.log('data from sse', data);
          this.list.reload();
        },
        error: (err) => {
          console.log('SSE Connection Closed - Reconnecting in 3 seconds');
          setTimeout(() => subscribe(), 3000);
        },
      });
    };
    subscribe();
  }

  constructor() {
    this.startSse();
  }

  private toggleCheck(id: string) {
    this.list.update((items) => {
      return items.map((i) =>
        i.ingredient_id === id ? { ...i, checked: !i.checked } : i
      );
    });
  }

  check(id: string): Observable<void> {
    this.toggleCheck(id);
    return this.httpClient
      .post<void>(`${API_URL}/list/check/${id}`, {})
      .pipe(
        catchError((err) => {
          this.toggleCheck(id);
          return throwError(() => err);
        })
      );
  }

  uncheck(id: string): Observable<void> {
    this.toggleCheck(id);
    return this.httpClient
      .post<void>(`${API_URL}/list/uncheck/${id}`, {})
      .pipe(
        catchError((err) => {
          this.toggleCheck(id);
          return throwError(() => err);
        })
      );
  }
}
