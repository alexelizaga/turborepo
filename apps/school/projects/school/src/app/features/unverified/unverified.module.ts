import { NgModule } from '@angular/core';
import { UnverifiedRoutingModule } from './unverified-routing.module';

import { SharedModule } from './../../shared/shared.module';
import { UnverifiedComponent } from './unverified.component';


@NgModule({
  declarations: [UnverifiedComponent],
  imports: [
    SharedModule,
    UnverifiedRoutingModule,
  ]
})
export class UnverifiedModule { }
