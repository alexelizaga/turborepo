import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FailureComponent } from './components/failure/failure.component';
import { SuccessComponent } from './components/success/success.component';

import { SubscribeComponent } from './subscribe.component';

const routes: Routes = [
  { path: '', component: SubscribeComponent },
  { path: 'success', component: SuccessComponent },
  { path: 'failure', component: FailureComponent }
];

@NgModule({
        imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscribeRoutingModule { }
