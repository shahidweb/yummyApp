import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  imports: [CommonModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.scss',
})
export class ProductFilter {
  selectedId = 0;

  filters = [
    { id: 1, name: "Salad", img: "assets/salad.png" },
    { id: 2, name: "Rolls", img: "assets/roll.png" },
    { id: 3, name: "Deserts", img: "assets/deserts.png" },
    { id: 4, name: "Sandwich", img: "assets/sandwich.png" },
    { id: 5, name: "Cake", img: "assets/cake.png" },
    { id: 6, name: "Pure Veg", img: "assets/pureveg.png" },
    { id: 7, name: "Pasta", img: "assets/pasta.png" },
    { id: 8, name: "Noodles", img: "assets/noodles.png" },
  ];


  selectFilterId(id: number) {
    console.log(id)
  }
}
