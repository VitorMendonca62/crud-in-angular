import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RolesUser } from '../../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  isAuthenticated(fromSingIn: boolean) {
    const token = localStorage.getItem('authorization');
    const stringExpiresIn = localStorage.getItem('expiresIn');

    if (token === null || stringExpiresIn === null) {
      if (!fromSingIn) this.router.navigate(['login']);
      return false;
    }

    const dateNow = new Date();
    const expiresIn = new Date(Date.parse(stringExpiresIn));
    if (expiresIn < dateNow) {
      if (!fromSingIn) this.router.navigate(['login']);
      return false;
    }

    return true;
  }

  authenticate(role: RolesUser) {
    const token = Math.random().toString(36).substring(2, 24);
    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 3);
    localStorage.setItem('authorization', `token ${token}`);
    localStorage.setItem('expiresIn', `${dateNow}`);
    localStorage.setItem('role', role);
  }

  logoutUser() {
    localStorage.removeItem('authorization');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('role');

    this.router.navigate(['login']);
  }
}
