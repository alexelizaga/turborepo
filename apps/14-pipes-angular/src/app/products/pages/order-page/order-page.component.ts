import { Component } from '@angular/core';

@Component({
  selector: 'products-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.sass'],
})
export class OrderPageComponent {
  public isUpperCase: boolean = true;

  toggleUpperCase(): void {
    this.isUpperCase = !this.isUpperCase;
  }
}
