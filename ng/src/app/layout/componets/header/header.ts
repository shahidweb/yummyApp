import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Login } from "../login/login";
import { Modal } from "../../../shared/components/modal/modal";

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, Login, Modal],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isLoginOpen = signal(false);
  cartItems = []
  user = ''
  navs = [
    { id: 1, name: "home", path: "/" },
    { id: 2, name: "menu", path: "/menu" },
    { id: 3, name: "mobile app", path: "/app" },
    { id: 4, name: "contact us", path: "/contact-us" },
  ];

  toggleLogin() {
    this.isLoginOpen.set(!this.isLoginOpen())
  }


}
