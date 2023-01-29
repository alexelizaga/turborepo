import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CoursesListComponent } from './pages/courses-list/courses-list.component';

const routes: Routes = [
	{ path: '', component: CoursesListComponent },
	{ path: ':tech', component: CoursesListComponent },
	{ path: ':tech/:id', component: CourseDetailsComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CoursesRoutingModule {}
