import { Component } from '@angular/core';
import { Header } from '../componets/header/header';
import { Footer } from '../componets/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
})
export class UserLayout {

}
