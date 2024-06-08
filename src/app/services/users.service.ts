import { Injectable } from '@angular/core';
import { IUser, RolesUser } from '../../models/user.model';
import { environment } from '../../environments/environment.development';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResponseWithOurRoleWithUsers } from '../pages/dashboard/dashboard';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  users: IUser[] = [];

  joinAllUsers(usersInRoles: IUser[][]): void {
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
    email = email.toLowerCase();

    const users = await this.foundAllUsers();
    let user: IUser | undefined;

    let i = 0;
    let running = true;

    while (i < users.length && running) {
      user = users[i];
      running = user.email !== email;
      i += 1;
    }
    return running ? undefined : user;
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
      this.http.delete(url).subscribe();
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
