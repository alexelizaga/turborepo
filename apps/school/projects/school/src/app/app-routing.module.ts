import { NgModule } from '@angular/core';
import {
	canActivate,
	hasCustomClaim,
	redirectUnauthorizedTo
} from '@angular/fire/auth-guard';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const redirectUnauthorizedToGuest = () => redirectUnauthorizedTo(['guest']);
// const redirectUnverifiedTo = (redirect: any[] ) => pipe(emailVerified, map(emailVerified => emailVerified || redirect));
// const redirectCourseToUnverified = () => redirectUnverifiedTo(['unverified']);
const adminOnly = () => hasCustomClaim('admin');

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'guest' // navegar al courses si no hay ruta.
	},
	{
		path: 'courses',
		loadChildren: () =>
			import('./features/courses/courses.module').then(
				(m) => m.CoursesModule
			)
		// ...canActivate(redirectCourseToUnverified)
	},
	{
		path: 'unverified',
		loadChildren: () =>
			import('./features/unverified/unverified.module').then(
				(m) => m.UnverifiedModule
			),
		...canActivate(redirectUnauthorizedToGuest)
	},
	{
		path: 'guest',
		loadChildren: () =>
			import('./features/guest/guest.module').then((m) => m.GuestModule)
	},
	{
		path: 'admin',
		loadChildren: () =>
			import('./features/admin/admin.module').then((m) => m.AdminModule),
		...canActivate(adminOnly)
	},
	{
		path: 'subscribe',
		loadChildren: () =>
			import('./features/subscribe/subscribe.module').then(
				(m) => m.SubscribeModule
			)
	},
	{
		path: 'terms',
		loadChildren: () =>
			import('./features/terms-privacy/terms-privacy.module').then(
				(m) => m.TermsPrivacyModule
			)
	},
	{
		path: 'privacy',
		loadChildren: () =>
			import('./features/terms-privacy/terms-privacy.module').then(
				(m) => m.TermsPrivacyModule
			)
	},
	{
		path: 'delete',
		loadChildren: () =>
			import('./features/terms-privacy/terms-privacy.module').then(
				(m) => m.TermsPrivacyModule
			)
	},
	{
		path: '**', // atrapa todas las rutas
		redirectTo: 'courses' // puede redirigir a courses o a la página "no encontrado".
	}
];

const routerOptions: ExtraOptions = {
	relativeLinkResolution: 'legacy'
};

@NgModule({
	imports: [RouterModule.forRoot(routes, routerOptions)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
