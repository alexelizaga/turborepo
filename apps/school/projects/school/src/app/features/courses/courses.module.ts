import { NgModule } from '@angular/core';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MarkdownModule } from 'ngx-markdown';
import { CourseService } from './../../core/services/course.service';
import { SharedModule } from './../../shared/shared.module';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CourseContentComponent } from './components/course-content/course-content.component';
import { CourseIndexComponent } from './components/course-index/course-index.component';
import { CourseMenuComponent } from './components/course-menu/course-menu.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CoursesListComponent } from './pages/courses-list/courses-list.component';

@NgModule({
	declarations: [
		CoursesListComponent,
		CourseDetailsComponent,
		CourseContentComponent,
		CourseIndexComponent,
		CourseMenuComponent,
		CourseCardComponent
	],
	imports: [
		SharedModule,
		CoursesRoutingModule,
		AngularFireStorageModule,
		MarkdownModule.forChild(),
		FontAwesomeModule
	],
	providers: [CourseService]
})
export class CoursesModule {}
