import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignalsLayoutComponent } from './layout/signals-layout/signals-layout.component';
import { CounterPageComponent } from './pages/counter-page/counter-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { UserInfoPageComponent } from './pages/user-info-page/user-info-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { UserSignalPageComponent } from './pages/user-signal-page/user-signal-page.component';

const routes: Routes = [
  {
    path: '',
    component: SignalsLayoutComponent,
    children: [
      { path: 'counter', component: CounterPageComponent },
      { path: 'properties', component: PropertiesPageComponent },
      { path: 'user-info', component: UserInfoPageComponent },
      { path: 'user', component: UserPageComponent },
      { path: 'user-signal', component: UserSignalPageComponent },
      { path: '**', redirectTo: 'counter' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignalsRoutingModule {}
