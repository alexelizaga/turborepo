import { ReviewService } from './../../../services/review.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormGroup,
  AbstractControl,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'my-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  myform: FormGroup;
  url = '';
  placeholder = '¿Quieres comentar algo? Nos encantaría leerlo. Recuerda no incluir datos sensibles. ¿Tienes alguna pregunta? Consulta el Centro de Ayuda o contacta con el servicio de asistencia.';

  constructor(
    public reviewService: ReviewService,
    public dialogRef: MatDialogRef<ReviewComponent>,
    private router: Router
  ) {
    this.myform = new FormGroup({
      body: new FormControl('', [Validators.required, Validators.minLength(6)])
   });
  }

  ngOnInit(): void {
    this.url = this.router.url;
  }

  get body(): AbstractControl | null {
    return this.myform.get('body');
  }

  async onSubmit(): Promise<void> {
    const body = this.body?.value;
    this.reviewService.addReview(this.url, body);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
