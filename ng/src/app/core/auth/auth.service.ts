import { Injectable } from '@angular/core';
import { GenericService } from '../../shared/services/generic-service';
import { ILoginForm, IUser } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private genericService: GenericService) { }

  loginUser(data: ILoginForm) {
    return this.genericService.req_post<null, ILoginForm>('login', data);
  }

  registerUser(data: ILoginForm) {
    return this.genericService.req_post<null, ILoginForm>('register', data)
  }

  getActiveUser() {
    return this.genericService.req_get<IUser>('me')
  }

  logout() {
    return this.genericService.req_get<null>('logout')
  }
}
