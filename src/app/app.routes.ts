import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { authGuard, noAuthGuard, singUphGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
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
    path: '',
    component: AppComponent,

    children: [
      {
        path: 'cadastro',
        pathMatch: 'full',
        component: SignUpComponent,
        canActivate: [singUphGuard],
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: SignInComponent,
        canActivate: [noAuthGuard],
      },
    ],
  },
];
