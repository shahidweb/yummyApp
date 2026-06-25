import { Component } from '@angular/core';
import { Banner } from "../components/banner/banner";
import { ProductList } from "../components/product-list/product-list";
import { ProductFilter } from "../components/product-filter/product-filter";

@Component({
  selector: 'app-home',
  imports: [Banner, ProductList, ProductFilter],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

}
