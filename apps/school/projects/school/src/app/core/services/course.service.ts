import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	DocumentChangeAction
} from '@angular/fire/firestore';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
	providedIn: 'root'
})
export class CourseService {
	constructor(private firestore: AngularFirestore) {}

	getCourses(): Observable<Course[]> {
		return this.firestore
			.collection<Course>('courses') // .orderBy NO FUNCIONA SI ALGUN CAMPO ESTA VACIO EN FIREBASE (ref) => ref.orderBy('tech').orderBy('courseName').orderBy('cap'))
			.snapshotChanges()
			.pipe(this.mapAddDocumentIdToCourses());
	}

	getCoursesFiltered(filter: string, type: string): Observable<Course[]> {
		return this.firestore
			.collection<Course>('courses', (ref) => ref.where(filter, '==', type)) // NO FUNCIONA SI ALGUN CAMPO ESTA VACIO EN FIREBASE  .orderBy('tech').orderBy('courseName').orderBy('cap'))
			.snapshotChanges()
			.pipe(this.mapAddDocumentIdToCourses());
	}

	private mapAddDocumentIdToCourses(): OperatorFunction<
		DocumentChangeAction<Course>[],
		Course[]
	> {
		return map((courseArraySnapshot: DocumentChangeAction<Course>[]) =>
			courseArraySnapshot.map((courseSnaphot) => {
				const doc = courseSnaphot.payload.doc;
				const course: Course = doc.data();
				const id: string = doc.id;

				const description = course.description?.replace(/\\n/gi, '\n');

				return <Course>{ ...course, id, description };
			})
		);
	}
}
