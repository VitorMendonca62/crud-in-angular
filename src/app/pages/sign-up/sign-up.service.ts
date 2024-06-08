import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { IUser, RolesUser } from '../../../models/user.model';
import { ICreateUser, IResponseWithOutRole } from './sign-up';
import { UsersService } from '../../services/users.service';
import { PermissionsService } from '../../services/permissions.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(
    public http: HttpClient,
    public usersService: UsersService,
    public permissionsService: PermissionsService
  ) {}
  listsUsers: IUser[] = [];
  isInDatabase: boolean = false;
  messageAlert: string = '';

  private verifyUser(user: IUser, email: string, number: string): boolean {
    if (user.email === email) {
      this.messageAlert =
        'Já existe um usuário com esse email. Tente novamente';
      return true;
    }
    if (user.number === number) {
      this.messageAlert =
        'Já existe um usuário com essa matrícula. Tente novamente';
      return true;
    }

    return false;
  }

  public async verifyIsInDatabase(
    email: string,
    number: string
  ): Promise<boolean> {
    const users = await this.usersService.foundAllUsers();
    let i = 0;
    let running = true;

    while (i < users.length && running) {
      const user = users[i];
      running = !this.verifyUser(user, email, number);
      i += 1;
    }

    return running;
  }

  public async createUser(
    newUser: ICreateUser,
    userRole: RolesUser
  ): Promise<IResponseWithOutRole> {
    const { email: _email, name, password: _password, role, number } = newUser;
    const email = _email.toLowerCase();
    const isInDatabase = await this.verifyIsInDatabase(email, number);

    if (!isInDatabase) {
      return {
        error: true,
        msg: this.messageAlert,
      };
    }
    const url = `${environment.hostApiUrl}/${newUser.role}s`;
    const password = bcrypt.hashSync(_password, 10);

    const canModificateUser = this.permissionsService.permissionModificateUser(
      role,
      userRole
    );

    if (canModificateUser) {
      const id = v4();
      const observable = this.http.post<Response>(url, {
        id,
        number,
        name,
        email,
        role,
        password,
      });

      observable.subscribe();

      return {
        error: false,
        msg: 'Usuário criado com sucesso',
      };
    }
    return {
      error: true,
      msg: 'Algo de errado na criação de cargos!',
    };
  }
}
