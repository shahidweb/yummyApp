import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.get<APIResponse<T>>(`${this.apiUrl}${url}`);
  }

  req_post<T, D>(url: string, payload: D) {
    return this.http.post<APIResponse<T>>(`${this.apiUrl}${url}`, payload)
  }

  req_update<T, D>(url: string, id: string, payload: D) {
    return this.http.put<APIResponse<T>>(`${this.apiUrl}${url}/${id}`, payload)
  }

  req_delete<T>(url: string, id: string) {
    return this.http.delete<APIResponse<T>>(`${this.apiUrl}${url}/${id}`)
  }


}
