import { Component, output } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { switchMap } from 'rxjs';
import { ILoginForm } from '../../../core/auth/auth.model';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthStore } from '../../../core/auth/auth.store';

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

  constructor(private authService: AuthService, private authStore: AuthStore) { }


  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.authService.loginUser(form.value).pipe(
      switchMap(() => this.authService.getActiveUser())
    ).subscribe({
      next: (res) => {
        if (res.data) {
          this.authStore.setUser(res.data);
          this.closeModel.emit()
        }
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

}
