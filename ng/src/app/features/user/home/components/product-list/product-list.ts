import { Component } from '@angular/core';
import { ProductType } from '../../../../../shared/utils/product.model';
import { ProductServices } from '../../services/product.services';
import { CartStore } from '../../../../../state/Cart/cart.store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList {
  products: ProductType[] = []

  constructor(private prodService: ProductServices, private cartStore: CartStore) { }

  ngOnInit() {
    this.prodService.getProduct().subscribe((res) => this.products = res.data)
  }

  increaseQty({ _id }: any) {
    this.cartStore.increase(_id)
  };

  decreaseQty({ _id }: any) {
    this.cartStore.decrease(_id)
  };


}