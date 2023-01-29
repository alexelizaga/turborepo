import { ReadMode } from './../models/read-mode.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ReadModeService {
	private default = ReadMode.Presentation;
	private localStorageKey = 'read-mode';

	getReadMode(): ReadMode {
		let readMode = localStorage.getItem(this.localStorageKey);
		if (!readMode) return this.default;
		if (readMode === ReadMode.Presentation) return ReadMode.Presentation;
		return ReadMode.Markdown;
	}
	setReadMode(readMode: ReadMode): void {
		localStorage.setItem(this.localStorageKey, readMode);
	}
}
