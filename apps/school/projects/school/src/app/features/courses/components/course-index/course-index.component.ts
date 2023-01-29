import { Component, Input } from '@angular/core';

@Component({
	selector: 'my-course-index',
	templateUrl: './course-index.component.html',
	styleUrls: ['./course-index.component.scss']
})
export class CourseIndexComponent {
	@Input()
	headings: Element[] = [];
}
