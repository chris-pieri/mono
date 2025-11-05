import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  httpClient = inject(HttpClient);
  list = httpResource<any[]>(() => `http://localhost:3000/api/list`, {
    defaultValue: [],
  });

  private toggleCheck(id: string) {
    this.list.update((items) => {
      return items.map((i) =>
        i.ingredient_id === id ? { ...i, checked: !i.selected } : i
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
