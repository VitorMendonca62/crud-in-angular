import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { IUser, RolesUser } from '../../../models/user.model';
import { ILoginUser, IResponse } from './sign-in';
import { UsersService } from '../../services/users.service';
// import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient, private usersService: UsersService) {}
  listsUsers: IUser[] = [];
  user: IUser | undefined;
  dataReturned!: { error: boolean; msg: string };

  loginUser(inputUser: ILoginUser): Promise<IResponse> {
    const { email, password } = inputUser;

    const errorEmailOrPassword = (): IResponse => {
      return {
        error: true,
        msg: 'Email ou senha estão incorretos.',
        role: undefined,
      };
    };

    const foundUser = (usersInRoles: IUser[][]) => {
      usersInRoles.forEach((usersInRole: IUser[]) => {
        usersInRole.forEach((user: IUser) => {
          if (user.email === email) {
            this.user = user;
          }
        });
      });
      return this.user;
    };

    const verifyPassword = (password: string) => {
      return bcrypt.compareSync(password, (this.user as IUser).password);
    };

    return new Promise((resolve, reject) => {
      this.usersService.foundAllUsers().forEach((usersInRoles: Response[]) => {
        foundUser(usersInRoles as unknown as IUser[][]);

        if (this.user == undefined) {
          resolve(errorEmailOrPassword());
          return;
        }

        const passwordIsCorrect = verifyPassword(password);

        if (!passwordIsCorrect) {
          resolve(errorEmailOrPassword());
          return;
        }

        resolve({
          error: false,
          msg: 'Logado com sucesso',
          role: this.user.role,
        });
      });
    });
  }
}
