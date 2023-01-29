import { ReadMode } from './../../../../core/models/read-mode.model';
import { ReadModeService } from './../../../../core/services/read-mode.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
	selector: 'my-course-details',
	templateUrl: './course-details.component.html',
	styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
	courseTitle: string | undefined;
	courseUrl: string | undefined;
	safeCourseUrl: SafeResourceUrl | undefined;
	headings: Element[] = [];
	markdownMode: boolean;

	loading = true;
	fullScreen = false; // if true hide index
	iframe = false;

	constructor(
		private sanitizer: DomSanitizer,
		private route: ActivatedRoute,
		private storage: AngularFireStorage,
		private router: Router,
		private readModeService: ReadModeService,
	) {
		this.markdownMode = readModeService.getReadMode() === ReadMode.Markdown;
		console.log(`ReadMode: ${readModeService.getReadMode()}`);
	}

	ngOnInit(): void {
		// removes fragment from url when user reloads page.
		// x: courses/agular/id#installation -> courses/agular/id
		this.router.navigate([]);
		const courseId = this.route.snapshot.params.id;
		const techItem = this.route.snapshot.params.tech.toLowerCase();
		this._fetchCourseUrl(courseId, techItem);
	}

	setTitle(title: Element | null) {
		this.courseTitle = title?.innerHTML;
	}

	setHeadings(headings: Element[]) {
		this.headings = headings;
		this._navigateToFragment();
	}

	onModeChange(markdownMode: boolean) {
		this.markdownMode = markdownMode;
		this.readModeService.setReadMode(this.markdownMode ? ReadMode.Markdown : ReadMode.Presentation);
	}

	onFontSizeChange(fontIncrement: number) {
		// if markdown resize document, if reveal resize slide
		let sectionSelector = this.markdownMode
			? 'markdown *'
			: 'section.present *';

		const sections = document.querySelectorAll(sectionSelector);

		// `sections: ${sections.length}`);

		for (let index = 0; index < sections.length; index++) {
			const el = sections[index] as HTMLElement;
			const fontSizeCss = window
				.getComputedStyle(el, null)
				.getPropertyValue('font-size');
			let fontSize = parseFloat(fontSizeCss);
			let newFontSize = fontIncrement + fontSize;
			// console.log(`modifiying font from ${fontSize} to ${newFontSize}`);
			el.style.fontSize = newFontSize + 'px';
			el.style.lineHeight = newFontSize * 1.2 + 'px';
		}
	}

	private async _fetchCourseUrl(courseId: any, techItem: any) {
		const courseFolder = `/courses/${techItem}/${courseId}`;

		// console.log('Trying md');
		// let courseUrl = '/assets/md/demo.md';
		let courseUrl = await this._trustedUrl(`${courseFolder}/index.md`);
		if (courseUrl) {
			this.fullScreen = false;
			this.iframe = false;
		}

		if (!courseUrl) {
			// console.log('Trying html');
			// fallback to html
			courseUrl = await this._trustedUrl(`${courseFolder}/index.html`);
			if (courseUrl) {
				this.fullScreen = true;
				this.iframe = true;
			}
		}
		if (!courseUrl) {
			// console.log('redirect to 404');
			courseUrl = '/assets/md/404.md';
			if (courseUrl) {
				this.fullScreen = true;
				this.iframe = false;
			}
		}
		this.loading = false;
		this.courseUrl = courseUrl;
	}

	private _navigateToFragment() {
		this.route.fragment.subscribe((fragment) => {
			if (this.markdownMode) {
				// console.log(`Getting element with id ${fragment}`);
				const elem = document.getElementById(fragment);
				if (elem) {
					elem.scrollIntoView({
						block: 'center'
					});
				}
			}
		});
	}

	/**
	 *
	 * @param docUrl x: /courses/react/${id}/index.md
	 */
	private async _trustedUrl(docUrl: string): Promise<string | undefined> {
		let url: string | undefined;
		try {
			url = await this.storage
				.ref(docUrl)
				.getDownloadURL()
				.pipe(catchError((_) => of('')))
				.toPromise();
			if (url) {
				// iframe requires safe url
				this.safeCourseUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
					url
				);
			}
		} catch (e) {
			url = undefined;
		}
		return url;
	}
}
