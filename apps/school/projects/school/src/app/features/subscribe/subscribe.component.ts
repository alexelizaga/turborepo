import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { Product } from './../../core/models/product.model';

@Component({
  selector: 'my-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  products: Observable<Product[]>;

  constructor( private readonly productService: ProductService ) {
    this.products = this.productService.getProducts();
  }

  ngOnInit(): void {
  }

}
