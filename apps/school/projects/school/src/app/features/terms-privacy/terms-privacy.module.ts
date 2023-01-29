import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '../../shared/shared.module';
import { TermsPrivacyRoutingModule } from './terms-privacy-routing.module';
import { TermsPrivacyComponent } from './terms-privacy.component';

@NgModule({
  declarations: [TermsPrivacyComponent],
  imports: [
    SharedModule,
    TermsPrivacyRoutingModule,
    MarkdownModule.forChild()
  ]
})
export class TermsPrivacyModule { }
