import { NgModule } from '@angular/core';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [],
  exports: [
    MenubarModule,
    MenuModule,
  ]
})
export class PrimeNgModule { }
