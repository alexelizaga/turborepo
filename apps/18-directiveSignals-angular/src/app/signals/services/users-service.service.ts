import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

import {
  PaginatedUsersResponse,
  SingleUserResponse,
  User,
} from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private baseUrl = 'https://reqres.in/api/users';

  getUserById(id: number): Observable<User> {
    return this.http.get<SingleUserResponse>(`${this.baseUrl}/${id}`).pipe(
      map((resp) => resp.data),
      tap((user) => console.log(user))
    );
  }

  loadPage(page: number): Observable<User[]> {
    return this.http
      .get<PaginatedUsersResponse>(this.baseUrl, { params: { page: page } })
      .pipe(map((response) => response.data));
  }
}
