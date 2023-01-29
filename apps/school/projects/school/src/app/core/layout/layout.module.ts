import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EmailLoginComponent } from './components/email-login/email-login.component';
import { LoginComponent } from './components/login/login.component';
import { LogoComponent } from './components/logo/logo.component';
import { ReviewComponent } from './components/review/review.component';
import { SocialShareComponent } from './components/social-share/social-share.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { LayoutComponent } from './layout.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
	declarations: [
		LayoutComponent,
		LoginComponent,
		EmailLoginComponent,
		SocialShareComponent,
		ReviewComponent,
		ThemeSwitchComponent,
		LogoComponent
	],
	imports: [
		// vendor
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule,
		ReactiveFormsModule,

		// material
		FlexLayoutModule,
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatMenuModule,
		MatDialogModule,
		MatFormFieldModule,
		MatInputModule,
		FontAwesomeModule,
    MatDividerModule
	],
	exports: [LayoutComponent],
	entryComponents: [EmailLoginComponent, ReviewComponent]
})
export class LayoutModule {}
