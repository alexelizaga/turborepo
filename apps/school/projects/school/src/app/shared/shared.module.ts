import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [],
	imports: [
		// vendor
		CommonModule,
		RouterModule
	],
	exports: [
		// vendor
		CommonModule, // ngIf, ngFor
		RouterModule, // routerLink, <router-outlet>

		// material
		FlexLayoutModule,
		MatIconModule,
		MatCardModule,
		MatExpansionModule,
		MatButtonModule,
		MatProgressSpinnerModule,
		MatChipsModule,
		MatMenuModule,
		MatDividerModule,
		MatSlideToggleModule,
		MatToolbarModule
		// ...
		// local
		// ...
	],
	providers: []
})
export class SharedModule {}
