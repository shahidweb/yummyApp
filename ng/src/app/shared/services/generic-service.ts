import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';


export type APIResponse<T = null> = {
  success: boolean;
  message: string;
  data?: T
}


@Injectable({
  providedIn: 'root',
})
export class GenericService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }


  req_get<T>(url: string) {
    return this.http.get<APIResponse<T>>(`${this.apiUrl}${url}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  req_post<T, D>(url: string, payload: D) {
    return this.http.post<APIResponse<T>>(`${this.apiUrl}${url}`, payload).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  req_update<T, D>(url: string, id: string, payload: D) {
    return this.http.put<APIResponse<T>>(`${this.apiUrl}${url}/${id}`, payload).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  req_delete<T>(url: string, id: string) {
    return this.http.delete<APIResponse<T>>(`${this.apiUrl}${url}/${id}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error as APIResponse);
  }



}
