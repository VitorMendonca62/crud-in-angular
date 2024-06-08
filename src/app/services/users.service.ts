import { Injectable } from '@angular/core';
import { IUser, RolesUser } from '../../models/user.model';
import { environment } from '../../environments/environment.development';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../pages/sign-in/sign-in';
import { IResponseWithOutRole } from '../pages/sign-up/sign-up';
import { IResponseWithOurRoleWithUsers } from '../pages/dashboard/dashboard';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  users: IUser[] = [];

  joinAllUsers(usersInRoles: IUser[][]) {
    this.users = [];
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

  async foundUser(email: string): Promise<IUser | undefined> {
    const users = await this.foundAllUsers();
    let i = 0;
    let running = true;
    let user: IUser | undefined;
    email = email.toLowerCase();

    while (i < users.length && running) {
      user = users[i];
      running = user.email !== email;
      i += 1;
    }
    if (!running) {
      return user;
    }
    return undefined;
  }

  async deleteUser(
    email: string,
    role: RolesUser
  ): Promise<IResponseWithOurRoleWithUsers> {
    const user = await this.foundUser(email);
    if (user) {
      const indexUser = this.users.indexOf(user);
      this.users.splice(indexUser, 1);

      const url = `${environment.hostApiUrl}/${role}s/${user.id}`;
      this.http.delete(url).subscribe((isValid) => isValid);
      return {
        error: false,
        msg: 'Usuário deletado com sucesso',
        users: this.users,
      };
    }
    return {
      error: true,
      msg: 'Usuário não existe',
      users: this.users,
    };
  }
}
