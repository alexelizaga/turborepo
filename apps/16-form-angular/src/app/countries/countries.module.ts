import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectorRoutingModule } from './countries-routing.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectorPageComponent],
  imports: [CommonModule, SelectorRoutingModule, ReactiveFormsModule],
})
export class CountriesModule {}
