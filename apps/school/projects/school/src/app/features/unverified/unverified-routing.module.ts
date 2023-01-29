import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnverifiedComponent } from './unverified.component';

const routes: Routes = [{ path: '', component: UnverifiedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnverifiedRoutingModule { }
