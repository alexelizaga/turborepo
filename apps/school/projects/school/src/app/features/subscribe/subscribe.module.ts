import { NgModule } from '@angular/core';
import { SubscribeRoutingModule } from './subscribe-routing.module';

import { SharedModule } from './../../shared/shared.module';
import { SubscribeComponent } from './subscribe.component';
import { ProductService } from '../../core/services/product.service';
import { ProductsComponent } from './components/products/products.component';
import { SuccessComponent } from './components/success/success.component';
import { FailureComponent } from './components/failure/failure.component';


@NgModule({
  declarations: [
    SubscribeComponent,
    ProductsComponent,
    SuccessComponent,
    FailureComponent
  ],
  imports: [
    SharedModule,
    SubscribeRoutingModule,
  ],
  providers: [ ProductService ],
})
export class SubscribeModule { }
