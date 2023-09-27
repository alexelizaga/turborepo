import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { filter } from 'rxjs';

import { User } from '../../interfaces/user-request.interface';
import { UsersService } from '../../services/users-service.service';

@Component({
  selector: 'signals-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent {
  public users: User[] = [];
  public currentPage: number = 1;

  private usersService = inject(UsersService);

  ngOnInit(): void {
    this.loadPage(this.currentPage);
  }

  loadPage(page: number) {
    this.usersService
      .loadPage(page)
      .pipe(filter((users) => users.length > 0))
      .subscribe((users) => {
        console.log(users);
        this.currentPage = page;
        // this.users = users;
        this.users = [...this.users, ...users];
      });
  }
}
