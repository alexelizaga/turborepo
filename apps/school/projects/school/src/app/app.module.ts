import { ReadModeService } from './core/services/read-mode.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HighlightService } from './core/services/highlight.service';
import { ThemeService } from './core/services/theme.service';

@NgModule({
	declarations: [AppComponent],
	imports: [
		CoreModule,
		AppRoutingModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production
		}),
		// markdown [src] requires httpClient
		HttpClientModule,
		MarkdownModule.forRoot({
			loader: HttpClient,
			sanitize: SecurityContext.NONE
		})
	],
	exports: [],
	providers: [ThemeService, HighlightService, ReadModeService],
	bootstrap: [AppComponent]
})
export class AppModule {}
