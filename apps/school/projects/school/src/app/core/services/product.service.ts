import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';
import { environment } from './../../../environments/environment.prod';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product> | undefined;
  public products: any;
  stripePromise = loadStripe(environment.stripe_key);

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
    this.productsCollection = this.firestore.collection<Product>('products', ref => ref.where('active', '==', true));
    this.products = this.productsCollection
      .snapshotChanges()
      .pipe(map(changes => {
        return changes.map(async action => {
          const data = action.payload.doc.data() as Product;
          data.id = action.payload.doc.id;

          const priceSnap = await action.payload.doc.ref
            .collection('prices')
            .orderBy('unit_amount')
            .get();

          priceSnap.docs.forEach((doc) => {
            // console.log(doc.id, ' => ', doc.data());
          });
          return data;
        });
      }));
  }

  getProducts(): Observable<Product[]>{
    return this.products;
  }

  async checkout(priceId: string): Promise<void> {
    const user = this.authService.user;
    // Call your backend to create the Checkout session.
    const docRef = await this.firestore
      .collection('customers')
      .doc(user?.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

    docRef.onSnapshot(async (snap) => {
      const data = snap.data();
      // console.log(data);
      if (data?.error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        // console.log(`An error occured: ${data?.error.message}`);
      }
      if (data?.sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await this.stripePromise;
        const error = await stripe?.redirectToCheckout({
          sessionId: data?.sessionId,
        });
        if (error) {
          console.log(error);
        }
      }
    });
  }

}


