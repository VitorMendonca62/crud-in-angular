import { Injectable } from '@angular/core';
import { IUser, RolesUser } from '../../models/user.model';
import { environment } from '../../environments/environment.development';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IResponseWithOurRoleWithUsers } from '../pages/dashboard/dashboard';
import { IData } from './users';
import { SearchEmitEventService } from './eventEmit.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private searchEmitEventService: SearchEmitEventService
  ) {}

  joinAllUsers(usersInRoles: IUser[][]): IUser[] {
    const users: IUser[] = [];
    usersInRoles.forEach((usersInRole: IUser[]) =>
      usersInRole.forEach((user: IUser) => users.push(user))
    );
    return users;
  }

  findUsersInRole(role: RolesUser): Promise<IUser[]> {
    const url = `${environment.hostApiUrl}/${role}s`;

    return new Promise((resolve, reject) => {
      this.http.get<IUser[]>(url).subscribe((users) => {
        return resolve(users);
      });
    });
  }

  findAllUsers(): Promise<IUser[]> {
    const listRoles: RolesUser[] = ['student', 'teacher', 'admin'];

    const observables = listRoles.map((_role: RolesUser) => {
      const url = `${environment.hostApiUrl}/${_role}s`;
      return this.http.get<IUser[]>(url);
    });

    const observablesForked = forkJoin(observables);

    return new Promise((resolve, reject) => {
      observablesForked.subscribe((usersInRoles) => {
        return resolve(this.joinAllUsers(usersInRoles));
      });
    });
  }

  async findUser(
    email: string,
    users: IUser[] | 'all'
  ): Promise<IUser | undefined> {
    email = email?.toLowerCase();

    if (users === 'all') {
      users = await this.findAllUsers();
    }

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
    role: RolesUser,
    users: IUser[]
  ): Promise<IResponseWithOurRoleWithUsers> {
    const user = await this.findUser(email, users);
    if (user) {
      const indexUser = users.indexOf(user);
      users.splice(indexUser, 1);

      const url = `${environment.hostApiUrl}/${role}s/${user.id}`;
      this.http.delete(url).subscribe();
      return {
        error: false,
        msg: 'Usuário deletado com sucesso',
        users,
      };
    }
    return {
      error: true,
      msg: 'Usuário não existe',
      users,
    };
  }

  async filterByName(name: string) {
    const data: IData = { students: [], admins: [], teachers: [] };

    const admins = await this.findUsersInRole('admin');
    data['admins'] = admins.filter((user) =>
      user.name.toLowerCase().includes(name)
    );

    const teachers = await this.findUsersInRole('teacher');
    data['teachers'] = teachers.filter((user) =>
      user.name.toLowerCase().includes(name)
    );

    const students = await this.findUsersInRole('student');
    data['students'] = students.filter((user) =>
      user.name.toLowerCase().includes(name)
    );

    return data;
  }
  async filterByNameWithClass(name: string, users: IUser[]) {
    const data: IData = { students: [], admins: [], teachers: [] };

    users.forEach((user) => {
      if (user.name.toLowerCase().includes(name)) {
        data[`${user.role}s`].push(user);
      }
    });

    return data;
  }
}
