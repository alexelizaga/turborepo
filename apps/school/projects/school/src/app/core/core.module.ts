import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from './../../environments/environment';
import { LayoutModule } from './layout/layout.module';
import { AuthService } from './services/auth.service';
import { ReviewService } from './services/review.service';

@NgModule({
	declarations: [],
	imports: [
		// vendor
		LayoutModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFirestoreModule.enablePersistence(),
		AngularFireAnalyticsModule
	],
	providers: [AuthService, ReviewService],
	exports: [LayoutModule]
})
export class CoreModule {}
