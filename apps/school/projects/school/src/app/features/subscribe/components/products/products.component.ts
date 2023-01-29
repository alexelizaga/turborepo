import { Component, OnInit } from '@angular/core';
import { environment } from './../../../../../environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { ProductService } from 'projects/school/src/app/core/services/product.service';
import { AuthService } from 'projects/school/src/app/core/services/auth.service';

@Component({
  selector: 'my-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  // TODO: Sacar de firestore

  priceMonth = 5;
  priceYear = 50;
  /*
  product = {
    id: 'prod_IVyECGmaZdkd9p',
    name: 'Basic',
    description: 'Basic membership',
    prices: [
      'price_1HuwHeCdmzGxC0dSLgCQU8KH',
      'price_1HuwHeCdmzGxC0dSv7M5YUYq',
    ],
  };
  */
 product = {
  id: 'prod_IkIkLA4tOU7ZW2',
  name: 'Premium',
  description: 'Para tener acceso a todos los contenidos',
  prices: [
    'price_1I8o8bCdmzGxC0dSlqMnEM26'
  ],
};

  constructor(
    public authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  checkout(priceId: string): void {
    this.productService.checkout(priceId);
  }

}
