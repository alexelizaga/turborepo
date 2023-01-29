import { Component, OnInit } from '@angular/core';
import { faMoon as fasMoon } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from 'projects/school/src/app/core/services/theme.service';

@Component({
	selector: 'my-theme-switch',
	templateUrl: './theme-switch.component.html',
	styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {
	theme: string;

	moon = fasMoon;

	constructor(private themeService: ThemeService) {
		this.theme = this.themeService.getTheme();
	}

	ngOnInit(): void {}

	toggleTheme() {
		this.theme = this.theme === 'dark' ? 'light' : 'dark';
		this.themeService.setTheme(this.theme);
	}
}
