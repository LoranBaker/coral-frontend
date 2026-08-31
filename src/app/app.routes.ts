import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CormanJvComponent } from './components/corman-jv/corman-jv.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'corman-jv',
    component: CormanJvComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];