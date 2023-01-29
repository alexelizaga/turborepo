import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../services/theme.service';
import { ReviewComponent } from './components/review/review.component';

interface Tech {
	value: string;
	viewValue: string;
}

@Component({
	selector: 'my-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	techs: Tech[] = [
		{ value: 'angular', viewValue: 'Angular' },
		{ value: 'react', viewValue: 'React' },
		{ value: 'vue', viewValue: 'Vue' },
		{ value: 'flutter', viewValue: 'Flutter' },
    { value: '', viewValue: 'Todos' }
	];
	allCourses: Tech = { value: '', viewValue: 'Cursos' };
	selectedTech: Tech = this.allCourses;

	cookieDialogVisible = true;

	constructor(
		public authService: AuthService,
		public router: Router,
		public activatedRoute: ActivatedRoute,
		private matDialog: MatDialog,
		private themeService: ThemeService
	) {
		router.events.subscribe((event) => {
			if (event instanceof NavigationStart) {
				const url = event.url;
				const regex = new RegExp('/courses/?([^/]*)');
				const found = url.match(regex);
				const tech = found?.[1];
				this.selectedTech =
					this.techs.filter((t) => t.value === tech)[0] ??
					this.allCourses;
			}
		});
	}

	ngOnInit(): void {
		const cookiesAccepted = localStorage.getItem('cookies_accepted');
		this.cookieDialogVisible = !cookiesAccepted;
		this.themeService.setTheme(localStorage.getItem('theme') || ThemeService.defaultTheme);
	}

	openDialog(): void {
		const dialogRef = this.matDialog.open(ReviewComponent);
		dialogRef.afterClosed().subscribe((result) => {
			// console.log(`The dialog was closed`);
		});
	}

	onCookiesAccepted(): void {
		this.cookieDialogVisible = !this.cookieDialogVisible;
		localStorage.setItem('cookies_accepted', 'true');
	}
}
