import { Component } from '@angular/core';
import { Color, Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'products-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.sass'],
})
export class OrderPageComponent {
  public isUpperCase: boolean = true;
  public orderBy?: keyof Hero;
  public heroes: Hero[] = [
    {
      name: 'Superman',
      canFly: true,
      color: Color.blue,
    },
    {
      name: 'Batman',
      canFly: false,
      color: Color.black,
    },
    {
      name: 'Daredevil',
      canFly: false,
      color: Color.red,
    },
    {
      name: 'Robin',
      canFly: false,
      color: Color.red,
    },
    {
      name: 'Green Lantern',
      canFly: true,
      color: Color.green,
    },
  ];

  toggleUpperCase(): void {
    this.isUpperCase = !this.isUpperCase;
  }

  changeOrder(value: keyof Hero): void {
    this.orderBy = value;
  }
}
