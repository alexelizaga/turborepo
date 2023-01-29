import { NgModule } from '@angular/core';
import { GuestRoutingModule } from './guest-routing.module';

import { SharedModule } from './../../shared/shared.module';
import { GuestComponent } from './guest.component';


@NgModule({
  declarations: [GuestComponent],
  imports: [
    SharedModule,
    GuestRoutingModule,
  ]
})
export class GuestModule { }
