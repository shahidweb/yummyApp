import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductType } from '../../../../../shared/utils/product.model';
import { ProductServices } from '../../services/product.services';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  products: ProductType[] = []
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

  constructor(private prodService: ProductServices) { }

  ngOnInit() {
    this.prodService.getProduct().subscribe((res) => this.products = res)
  }


  selectFilterId(id: number) {
    console.log(id)
  }

  decreaseQty(props: any) {
    console.log(props)
  };
  increaseQty(props: any) {
    console.log(props)
  };

}