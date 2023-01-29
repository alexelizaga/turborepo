import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
	AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Review } from './../models/review.model';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class ReviewService {
	private itemDoc: AngularFirestoreDocument<Review> | undefined;
	private itemsCollection: AngularFirestoreCollection<Review>;
	private items: Observable<Review[]>;

	constructor(
		private authService: AuthService,
		private firestore: AngularFirestore
	) {
		this.itemsCollection = firestore.collection<Review>('reviews', (ref) =>
			ref.orderBy('url')
		);
		this.items = this.itemsCollection.valueChanges();
	}

	getReviews(): Observable<Review[]> {
		return this.items;
	}

	addReview(url: string, body: string): void {
		const user = this.authService.user;
		if (user) {
			const item: Review = {
				url,
				body,
				createdOn: Date.now(),
				email: user.email ?? '',
				uid: user.uid
			};
			this.itemsCollection.add(item);
		}
	}
}
