import { Component, output } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { switchMap } from 'rxjs';
import { ILoginForm } from '../../../core/auth/auth.model';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthStore } from '../../../core/auth/auth.store';
import { NotificationService } from '../../../shared/services/notificationService';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  isLogin = true;
  closeModel = output<void>();

  login: ILoginForm = {
    name: "",
    email: "",
    password: ""
  }

  constructor(
    private authService: AuthService,
    private authStore: AuthStore,
    private notificationService: NotificationService) { }

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.authService.loginUser(form.value).pipe(
      switchMap(() => this.authService.getActiveUser())
    ).subscribe({
      next: (res) => {
        if (res.data) {
          this.notificationService.success(res.message);
          this.authStore.setUser(res.data);
          this.closeModel.emit();
        }
      },
      error: (err) => {
        this.notificationService.error(err.message);
        console.error('err', err);
      }
    })
  }

}