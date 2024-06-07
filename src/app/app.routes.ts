import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';

export const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: SignInComponent },
  { path: 'cadastro', pathMatch: 'full', component: SignUpComponent },
];
