import {
	AfterViewChecked,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';
import Reveal, { RevealOptions } from 'reveal.js';
import Highlight from 'reveal.js/plugin/highlight/highlight.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.js';
import { HighlightService } from '../../../../core/services/highlight.service';

declare let hljs: any;

@Component({
	selector: 'my-course-content',
	templateUrl: './course-content.component.html',
	styleUrls: ['./course-content.component.scss']
})
export class CourseContentComponent
	implements OnInit, OnChanges, AfterViewChecked {
	@Input()
	markdownMode: boolean | undefined;

	@Input()
	src: string | undefined;

	@Output()
	titleEvent = new EventEmitter<Element>();

	@Output()
	headingsEvent = new EventEmitter<Element[]>();

	private _reveal: Reveal | undefined;

	constructor(
		public sanitizer: DomSanitizer,
		private elementRef: ElementRef<HTMLElement>,
		private activatedRoute: ActivatedRoute,
		private highlightService: HighlightService,
		private markdownService: MarkdownService
	) {
		this.activatedRoute.fragment.subscribe((fragment) => {
			// when user navigates to fragment if presentation mode
			// go to slide
			if (fragment && this._reveal && !this.markdownMode) {
				const slide = this._fragmentToSlide.get(fragment);
				if (slide) {
					this._reveal.slide(slide);
				}
			}
		});
	}
	ngOnInit(): void {
		this.markdownService.renderer.code = (
			text: string,
			languageAnnotation: string | undefined
		): string => {
			let textEl = document.createTextNode(text);
			let codeEl = document.createElement('code');
			let preEl = document.createElement('pre');

			// if class []
			// typescript [1-2]
			let dataLineNumber: string | null = null;
			let languages: string[] = [];
			languageAnnotation
				?.split(' ')
				.filter((l) => l)
				.forEach((l) => {
					let matched = l.match(/\[(.*)\]/);
					if (matched) {
						dataLineNumber = matched[1];
					} else {
						languages.push(l);
					}
				});
			if (dataLineNumber !== null) {
				codeEl.setAttribute('data-line-numbers', dataLineNumber);
			}
			codeEl.classList.add(...languages);
			codeEl.append(textEl);
			preEl.append(codeEl);

			return preEl.outerHTML;

			// const codeEscaped = text
			// 	.replace(/&/g, '&amp;')
			// 	.replace(/</g, '&lt;')
			// 	.replace(/>/g, '&gt;')
			// 	.replace(/"/g, '&quot;')
			// 	.replace(/'/g, '&#039;');
			// return `<pre><code class="${language}"> ${codeEscaped} </code></pre>`;
		};
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (!this.markdownMode) {
			// wait angular to add element to DOM
			setTimeout(() => this._initializeReveal(), 100);
		} else {
			setTimeout(() => this.highlightService.highlightAll(), 500);
			this._reveal = undefined;
		}
	}

	_highlighted = false;
	ngAfterViewChecked() {
		// if (this.markdownMode && !this._highlighted) {
		// 	console.log('highlighting all...');
		// 	setTimeout(() => this.highlightService.highlightAll(), 100);
		// 	this._highlighted = true;
		// }
	}

	private _fragmentToSlide: Map<string, number> = new Map<string, number>();

	onLoad(): void {
		this._emitTitle();
		this._emitHeadings();
		if (!this.markdownMode) {
			this._initRevealFragmentToSlide();
		}
	}

	private _emitTitle(): void {
		const element = this.elementRef.nativeElement;
		const title = element.querySelector('h1') as Element;
		this.titleEvent.emit(title);
	}

	private _emitHeadings(): void {
		const headings: Element[] = [];
		this.elementRef.nativeElement.querySelectorAll('h2').forEach((x) => {
			x.id = x.innerText
				.trim()
				.toLowerCase()
				.split(' ')
				.join('_')
				.replace('.', '');
			headings.push(x);
		});
		this.headingsEvent.emit(headings);
	}

	/*
	 * Reveal
	 */
	private slideHSeparator = '^---';
	private slideVSeparator = '^<!-- -- -->';
	private revealOptions: RevealOptions = {
		progress: true,
		hash: false,
		history: false,
		// not working :-/
		backgroundTransition: 'slide',
		// not working :-/
		transition: 'slide',
		// not working :-/
		transitionSpeed: 'slow', // default/fast/slow
		plugins: [Markdown, Highlight]
	};

	private _initRevealFragmentToSlide() {
		// calculate the slide number based on h2
		// all h2 will have an id with a valid #fragment
		// TODO: Use element ref
		const element = this.elementRef.nativeElement;
		const revealSections = element.querySelectorAll(
			'.reveal > .slides > section'
		);
		// console.log(`📦 ${revealSections.length} of sections`);
		let slide = 0;
		for (let index = 0; index < revealSections.length; index++) {
			const section = revealSections[index];
			const h2 = section.querySelector('h2');
			const id = h2?.getAttribute('id');
			if (id) {
				this._fragmentToSlide.set(id, slide);
			}
			slide++;
		}
	}

	private _initializeReveal(): void {
		if (this.src) {
			const slides = document.querySelector('.reveal .slides');
			if (slides) {
				// create section element with src to markdown file
				const section = document.createElement('section');
				section.setAttribute('data-markdown', this.src);
				section.setAttribute('data-separator', this.slideHSeparator);
				section.setAttribute(
					'data-separator-vertical',
					this.slideVSeparator
				);
				// section.classList.add(
				// 	'animate__animated',
				// 	//'animate__wobble'
				// 	// 'animate__headShake'
				// 	'animate__fadeIn'
				// );
				slides.append(section);
				this._reveal = new Reveal();
				this._reveal
					.initialize(this.revealOptions)
					.then(() => this.onLoad());
				// reveal.on('slidechanged', (event: SlideEvent) => {});
			} else {
				console.error(' 🙊 slides not present');
			}
		}
	}
}
