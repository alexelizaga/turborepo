import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrls: ['./basics-page.component.sass']
})
export class BasicsPageComponent {
  public nameLower: string = 'alex';
  public nameUpper: string = 'ALEX';
  public fullName: string = 'aLEx eLÍzaGa';
  public customDate: Date = new Date()
}
