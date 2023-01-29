import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'my-logo',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
	@Input()
	small: boolean = false;

	constructor() {}

	ngOnInit(): void {}
}
