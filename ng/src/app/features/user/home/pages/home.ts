import { Component } from '@angular/core';
import { Banner } from "../components/banner/banner";
import { ProductList } from "../components/product-list/product-list";

@Component({
  selector: 'app-home',
  imports: [Banner, ProductList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
