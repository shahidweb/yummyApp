import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  isLogin = true;
  login = {
    name: "",
    email: "",
    password: ""
  }

  constructor() { }


  onSubmit(form: any) {
    if (form.valid) {
      console.log(form.value);
    }
  }

}
