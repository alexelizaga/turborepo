import { Injectable } from '@angular/core';

@Injectable()
export class ThemeService {
  static defaultTheme = 'dark';

	getTheme(): string {
		return localStorage.getItem('theme') || ThemeService.defaultTheme;
	}
	setTheme(theme: string): void {
		const bodyClassList = document.querySelector('body')!.classList;
		const removeClassList = /\w*-theme\b/.exec(bodyClassList.value);
		if (removeClassList) {
			bodyClassList.remove(...removeClassList);
		}
		bodyClassList.add(`${theme}-theme`);
		localStorage.setItem('theme', theme);
	}
}
