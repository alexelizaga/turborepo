import { Component, computed, inject, signal } from '@angular/core';
import { filter } from 'rxjs';

import { UsersService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-user-signal-page',
  templateUrl: './user-signal-page.component.html',
  styleUrls: ['./user-signal-page.component.css'],
})
export class UserSignalPageComponent {
  private usersService = inject(UsersService);

  private _users = signal<User[]>([]);
  private _currentPage = signal(1);

  public users = computed(() => this._users());
  public currentPage = computed(() => this._currentPage());
  public labelTotalUsers = computed(
    () => `Total de usuarios ${this.users().length}`
  );

  ngOnInit(): void {
    this.loadPage(this.currentPage());
  }

  loadPage(page: number) {
    this.usersService
      .loadPage(page)
      .pipe(filter((users) => users.length > 0))
      .subscribe((newUsers) => {
        this._currentPage.set(page);
        // this.users.set( users );
        // this.users.set([ ...this.users(), ...users ]);
        this._users.update((currentUsers) => [...currentUsers, ...newUsers]);
      });
  }
}
