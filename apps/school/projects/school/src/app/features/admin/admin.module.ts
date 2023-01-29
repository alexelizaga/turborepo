import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';

import { SharedModule } from './../../shared/shared.module';
import { AdminComponent } from './admin.component';
import { CourseService } from '../../core/services/course.service';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    SharedModule,
    AdminRoutingModule,

    // Material
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [ CourseService ],
})
export class AdminModule { }
