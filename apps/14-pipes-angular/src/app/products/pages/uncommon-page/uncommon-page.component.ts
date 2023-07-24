import { Component } from '@angular/core';
import { Observable, interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrls: ['./uncommon-page.component.sass'],
})
export class UncommonPageComponent {
  // i18nSelect
  public name: string = 'Alex';
  public gender: 'male' | 'female' = 'male';
  public invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient(): void {
    this.name = 'Lidia';
    this.gender = 'female';
  }

  // i18Plural
  public clients: string[] = ['Alex', 'Lidia', 'Airi', 'Liam', 'Javi', 'Laura'];
  public clientsMap = {
    '=0': "don't have any customers waiting",
    '=1': 'have 1 client waiting',
    other: 'have # clients waiting',
  };

  deleteClient(): void {
    this.clients.shift();
  }

  // KeyValue Pipe
  public person = {
    name: 'Alex',
    age: 35,
    address: 'Madrid, Spain',
  };

  // Async Pipe
  public myObservableTimer: Observable<number> = interval(2000).pipe(
    tap((value) => console.log('tap:', value))
  );

  public promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Tenemos data en la promesa');
      console.log('Tenemos data en la promesa');
    }, 3500);
  });
}
