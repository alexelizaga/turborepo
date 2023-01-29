import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../../../core/models/course.model';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
	selector: 'my-course-card',
	templateUrl: './course-card.component.html',
	styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
	@Input()
	course?: Course = undefined;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {}

	private user = () => this.authService.user;

	userLogged = () => this.user() !== undefined;

	freeCourse = () =>
		!this.course?.comingSoon &&
		(this.course?.free ||
			this.user()?.isAdmin ||
			this.user()?.isSubscribed);

	paidCourseLock = () =>
		!this.course?.comingSoon &&
		!this.course?.free &&
		!this.user()?.isAdmin &&
		!this.user()?.isSubscribed;
}
