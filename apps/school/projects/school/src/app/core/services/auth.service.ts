import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public user?: User;
	// public isLogged = false;
	// public isSubscribed = false;
	// public isAdmin = false;

	constructor(private fbAuth: AngularFireAuth, private router: Router) {
		fbAuth.authState.subscribe(async (fbUser) => {
			this.user = await this.setUser(fbUser);
			if (fbUser?.emailVerified === false) {
				// user is not verified
				fbUser?.sendEmailVerification();
				this.router.navigate(['/unverified']);
			}
		});
	}

	Glogin(): void {
		this.fbAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	}

	Flogin(): void {
		this.fbAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
	}

	login(email: string, password: string): void {
		this.fbAuth.signInWithEmailAndPassword(email, password);
	}

	signup(email: string, password: string): void {
		this.fbAuth.createUserWithEmailAndPassword(email, password);
	}

	passwordreset(email: string): void {
		this.fbAuth.sendPasswordResetEmail(email);
	}

	async sendEmailVerification(): Promise<void> {
		return this.fbAuth.currentUser.then((user) => {
			return user?.sendEmailVerification();
		});
	}

	logout(): void {
		this.fbAuth.signOut();
	}

	private async setUser(
		fbUser: firebase.User | null
	): Promise<User | undefined> {
		let user: User | undefined = undefined;
		if (fbUser) {
			const token = await fbUser?.getIdTokenResult(true);
			return {
				uid: fbUser.uid,
				email: fbUser.email ?? undefined,
				displayName: fbUser.displayName ?? undefined,
				photoURL: fbUser.photoURL ?? '/assets/logo/profile.png',
				emailVerified: fbUser.emailVerified,
				isSubscribed: token?.claims.stripeRole === 'basic',
				isAdmin: token?.claims.admin
			};
		}
		return user;
	}
}
