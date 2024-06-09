import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard, noAuthGuard } from './auth.guard';
import { Error404Component } from './pages/404/404.component';
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
  {
    path: '**',
    pathMatch: 'full',
    component: Error404Component,
    canActivate: [noAuthGuard],
  },
];
