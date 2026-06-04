import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {
    console.log(this.apiUrl)
  }


  req_get<T>(url: string) {
    return this.http.get<T>(`${this.apiUrl}${url}`);
  }

  req_post<T, D>(url: string, payload: D) {
    return this.http.post<T>(url, payload)
  }

  req_update<T, D>(url: string, id: string, payload: D) {
    return this.http.put<T>(`${url}/${id}`, payload)
  }

  req_delete<T>(url: string, id: string) {
    return this.http.delete<T>(`${url}/${id}`)
  }


}
