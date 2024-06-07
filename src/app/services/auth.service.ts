import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { v4 } from 'uuid';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  isAuthenticated() {
    const token = localStorage.getItem('authorization');
    const stringExpiresIn = localStorage.getItem('expiresIn');

    if (token === null || stringExpiresIn === null) {
      this.router.navigate(['/login']);
      return;
    }

    const dateNow = new Date();
    const expiresIn = new Date(Date.parse(stringExpiresIn));
    if (expiresIn < dateNow) {
      this.router.navigate(['/login']);
    }
  }

  async authenticate() {
    const token = Math.random().toString(36).substring(2, 24);
    const dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 3);
    localStorage.setItem('authorization', `token ${token}`);
    localStorage.setItem('expiresIn', `${dateNow}`);
  }
}
