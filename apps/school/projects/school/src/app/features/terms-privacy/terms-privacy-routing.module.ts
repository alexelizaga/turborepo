import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsPrivacyComponent } from './terms-privacy.component';


const routes: Routes = [{ path: '', component: TermsPrivacyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsPrivacyRoutingModule { }
