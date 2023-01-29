import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { EmailLoginComponent } from '../email-login/email-login.component';

@Component({
	selector: 'my-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
	constructor(
		public authService: AuthService,
		private matDialog: MatDialog
	) {}

	openDialog(): void {
		const dialogRef = this.matDialog.open(EmailLoginComponent);

		dialogRef.afterClosed().subscribe((result) => {
			// console.log(`The dialog was closed`);
		});
	}

	Glogin(): void {
		this.authService.Glogin();
	}

	Flogin(): void {
		this.authService.Flogin();
	}

	sendEmailVerification(): void {
		this.authService.sendEmailVerification();
	}

	logout(): void {
		this.authService.logout();
	}
}
