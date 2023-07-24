import { Component } from '@angular/core';

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
}
