import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { IUser } from '../../../models/user.model';
import { ICreateUser, IResponseSingIn } from './sign-up';
import { UsersService } from '../../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient, private usersService: UsersService) {}
  listsUsers: IUser[] = [];
  isInDatabase: boolean = false;
  messageAlert: string = '';

  verifyUser(user: IUser, email: string, number: string) {
    if (user.email === email || user.number === number) {
      this.isInDatabase = true;
      if (user.email === email) {
        this.messageAlert =
          'Já existe um usuário com esse email. Tente novamente';
      }
      if (user.number === number) {
        this.messageAlert =
          'Já existe um usuário com essa matrícula. Tente novamente';
      }
    }
  }

  verifyIsInDatabase(
    email: string,
    number: string,
    usersInRoles: IUser[][]
  ): void {
    usersInRoles.forEach((usersInRole: IUser[]) => {
      usersInRole.forEach((user: IUser) =>
        this.verifyUser(user, email, number)
      );
    });
  }

  createUser(newUser: ICreateUser): Promise<IResponseSingIn> {
    const { email, name, password, role, number } = newUser;
    return new Promise((resolve, reject) => {
      this.usersService
        .foundAllUsers()
        .subscribe((usersInRoles: Response[]) => {
          this.verifyIsInDatabase(
            email,
            number,
            usersInRoles as unknown as IUser[][]
          );

          if (this.isInDatabase) {
            resolve({
              error: true,
              msg: this.messageAlert,
            });
            return;
          }

          const url = `${environment.hostApiUrl}/${newUser.role}s`;
          const passworHash = bcrypt.hashSync(password, 10);

          const observable = this.http.post<Response>(url, {
            id: v4(),
            number,
            name,
            email,
            role,
            password: passworHash,
          });
          observable.subscribe((response) => response);
          return resolve({
            error: false,
            msg: 'Usuário criado com sucesso',
          });
        });
    });
  }
}
