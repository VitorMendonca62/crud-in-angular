import { Injectable } from '@angular/core';
import { RolesUser } from '../../models/user.model';
import { environment } from '../../environments/environment.development';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  foundAllUsers() {
    const listRoles: RolesUser[] = ['student', 'teacher', 'admin'];
    const observables = listRoles.map((role: RolesUser) => {
      const url = `${environment.hostApiUrl}/${role}s`;
      return this.http.get<Response>(url);
    });
    return forkJoin(observables);
  }
}
