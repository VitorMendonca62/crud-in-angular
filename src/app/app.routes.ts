import { Routes } from '@angular/router';
import { SingInComponent } from './pages/sing-in/sing-in.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';

export const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: SingInComponent },
  { path: 'cadastro', pathMatch: 'full', component: SingUpComponent },
];
