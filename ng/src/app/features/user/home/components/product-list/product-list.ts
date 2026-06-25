import { Component } from '@angular/core';
import { ProductType } from '../../../../../shared/utils/product.model';
import { ProductServices } from '../../services/product.services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  products: ProductType[] = []

  constructor(private prodService: ProductServices) { }

  ngOnInit() {
    this.prodService.getProduct().subscribe((res) => this.products = res.data)
  }

  decreaseQty(props: any) {
    console.log(props)
  };
  increaseQty(props: any) {
    console.log(props)
  };

}