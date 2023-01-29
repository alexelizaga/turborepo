import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'my-course-menu',
	templateUrl: './course-menu.component.html',
	styleUrls: ['./course-menu.component.scss']
})
export class CourseMenuComponent implements OnInit {
	private fontIncrement = 1;

	@Input()
	title: string | undefined;

	@Input()
	headings: Element[] = [];

	@Input()
	markdownMode: boolean | undefined;

	@Output()
	toggleModeEvent = new EventEmitter<boolean>();

	@Output()
	fontSizeEvent = new EventEmitter<number>();

	backRoute: string = '/courses';

	constructor(private activatedRoute: ActivatedRoute) {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.backRoute = `/courses/${params.tech}`;
		});
	}

	ngOnInit(): void {}

	reduceFont = () => this.fontSizeEvent.emit(-this.fontIncrement);

	increaseFont = () => this.fontSizeEvent.emit(this.fontIncrement);

	toggleMode() {
		this.markdownMode = !this.markdownMode;
		this.toggleModeEvent.emit(this.markdownMode);
	}
}
