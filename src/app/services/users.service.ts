import { Injectable } from '@angular/core';
import { IUser, RolesUser } from '../../models/user.model';
import { environment } from '../../environments/environment.development';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  users: IUser[] = [];

  joinAllUsers(usersInRoles: IUser[][]) {
    usersInRoles.forEach((usersInRole: IUser[]) =>
      usersInRole.forEach((user: IUser) => this.users.push(user))
    );
  }

  foundAllUsers(): Promise<IUser[]> {
    const listRoles: RolesUser[] = ['student', 'teacher', 'admin'];

    const observables = listRoles.map((role: RolesUser) => {
      const url = `${environment.hostApiUrl}/${role}s`;
      return this.http.get<IUser[]>(url);
    });

    const observablesForked = forkJoin(observables);

    return new Promise((resolve, reject) => {
      observablesForked.subscribe((usersInRoles) => {
        this.joinAllUsers(usersInRoles);
        return resolve(this.users);
      });
    });
  }
}
