import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

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
  list = httpResource<ListItem[]>(() => `http://localhost:3000/api/list`, {
    defaultValue: [],
    parse(value: any) {
      // Need to use any above otherwise throws error
      return parseList(value);
    },
  });

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
      .post<void>(`http://localhost:3000/api/list/check/${id}`, {})
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
      .post<void>(`http://localhost:3000/api/list/check/${id}`, {})
      .pipe(
        catchError((err) => {
          this.toggleCheck(id);
          return throwError(() => err);
        })
      );
  }
}
