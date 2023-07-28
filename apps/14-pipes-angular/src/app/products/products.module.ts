import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';

import { BasicsPageComponent } from './pages/basics-page/basics-page.component';
import { NumbersPageComponent } from './pages/numbers-page/numbers-page.component';
import { UncommonPageComponent } from './pages/uncommon-page/uncommon-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { ToggleCasePipe } from './pipes/toggle-case.pipe';

@NgModule({
  declarations: [
    BasicsPageComponent,
    NumbersPageComponent,
    UncommonPageComponent,
    OrderPageComponent,
    ToggleCasePipe,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
