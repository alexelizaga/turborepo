import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	faAngular,
	faReact,
	faVuejs,
	IconDefinition
} from '@fortawesome/free-brands-svg-icons';
import { faEllipsisH, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { Course } from '../../../../core/models/course.model';
import { AuthService } from '../../../../core/services/auth.service';
import { CourseService } from '../../../../core/services/course.service';

interface Tech {
	label: string;
	order: number;
	icon?: IconDefinition;
}

@Component({
	selector: 'my-courses-list',
	templateUrl: './courses-list.component.html',
	styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnDestroy {
	constructor(
		private activatedRoute: ActivatedRoute,
		private courseService: CourseService,
		public authService: AuthService
	) {
		console.log('constructor');
	}
	coursesByTech: { [key: string]: Course[] } = {};
	techs: Tech[] = [];

	private courses: Observable<Course[]> = EMPTY;
	private activatedRoute$: Subscription | undefined;
	private courses$: Subscription | undefined;

	private techGroups: { [key: string]: Tech } = {
		angular: { label: 'angular', order: 1, icon: faAngular },
		react: { label: 'react', order: 2, icon: faReact },
		vue: { label: 'vue', order: 3, icon: faVuejs },
		flutter: { label: 'flutter', order: 4, icon: faMobileAlt },
		otros: { label: 'otros', order: 5, icon: faEllipsisH }
	};
	private otherTechGroup = 'otros';

	ngOnInit(): void {
		console.log('ngOnInit');
		this.activatedRoute$ = this.activatedRoute.params.subscribe(
			({ tech }) => this.updateCourses(tech)
		);
	}

	ngOnDestroy(): void {
		console.log('ngOnDestroy');
		this.activatedRoute$?.unsubscribe();
		this.courses$?.unsubscribe();
	}

	updateCourses(techItem: string): void {
		this.courses$?.unsubscribe();
		if (techItem !== undefined) {
			this.courses = this.courseService.getCoursesFiltered(
				'tech',
				techItem
			);
		} else {
			this.courses = this.courseService.getCourses();
		}

		this.courses$ = this.courses.subscribe((courses) => {
			this.techs = [];
			this.coursesByTech = {};
			if (courses.length) {
				courses 
				.sort(compareCourses)
				.forEach((course) => {
					let { tech } = course;
					if (!this.techGroups[tech]) {
						tech = this.otherTechGroup;
					}
					const courses = this.coursesByTech[tech] || [];
					courses.push(course);
					this.coursesByTech[tech] = courses;
				});
				this.techs = Object.keys(this.coursesByTech)
					.map((techLabel) => this.techGroups[techLabel])
					.sort((t1, t2) => t1.order - t2.order);
			} else {
				// no courses yet
				this.techs = [this.techGroups[techItem]];
			}
		});
	}
}

function compareCourses(c1: Course, c2: Course) : number {
	const techComparison = c1.tech.localeCompare(c2.tech);
	const courseNameComparison = (c1.courseName ?? '').localeCompare((c2.courseName ?? ''));
	const capComparison = (c1.cap ?? 0) - (c2.cap ?? 0);
	return techComparison || courseNameComparison || capComparison;
}
