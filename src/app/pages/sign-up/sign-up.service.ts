import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { IUser, RolesUser } from '../../../models/user.model';
import { ICreateUser, KeysUser } from './sign-up';
import { forkJoin } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SignUpService {
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

}
