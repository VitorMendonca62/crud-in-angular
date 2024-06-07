import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { IUser, RolesUser } from '../../../models/user.model';
import { ICreateUser, KeysUser } from './sing-up';
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SingUpService {
  constructor(private http: HttpClient) {}
  listsUsers: IUser[] = [];

  createUser(newUser: ICreateUser) {
    const url = `${environment.hostApiUrl}/${newUser.role}s`;
    const { email, name, password, role, number } = newUser;
    const passworHash = bcrypt.hashSync(password, 10);

    const user: IUser = {
      id: v4(),
      number,
      name,
      email,
      role,
      password: passworHash,
    };

    this.http.post<Response>(`${environment.hostApiUrl}/alls`, user);
    return this.http.post<Response>(url, user);
  }
  foundAllUsers() {
    const listRoles: RolesUser[] = ['student', 'teacher', 'admin'];
    const observables = listRoles.map((role: RolesUser) => {
      const url = `${environment.hostApiUrl}/${role}s`;
      return this.http.get<Response>(url);
    });
    return forkJoin(observables);
  }
}
