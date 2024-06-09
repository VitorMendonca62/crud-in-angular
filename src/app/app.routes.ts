import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/layout/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { authGuard, noAuthGuard, signUpGuard } from './auth.guard';
import { EditUserComponent } from './components/layout/edit-user/edit-user.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        pathMatch: 'full',
        component: DashboardComponent,
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: SignInComponent,
    canActivate: [noAuthGuard],
  },
];
