import { Injectable } from '@angular/core';
import { GenericService } from '../../../../shared/services/generic-service';

@Injectable({
  providedIn: 'root',
})
export class ProductServices {

  constructor(private service:GenericService){}


  getProduct(){
    return this.service.req_get<any>('product')
  }
  
}
