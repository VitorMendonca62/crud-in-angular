import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { IUser, RolesUser } from '../../../models/user.model';
import { ILoginUser } from './sign';
import { UsersService } from '../../services/users.service';
// import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(
    private http: HttpClient,
    private usersService: UsersService,
  ) {}
  listsUsers: IUser[] = [];
  user: IUser | undefined;
  dataReturned: { error: boolean; msg: string } = { error: false, msg: '' };


  loginUser(inputUser: ILoginUser) {
    const { email, password } = inputUser;

    return new Promise((resolve, reject) => {
      this.usersService.foundAllUsers().forEach((response: Response[]) => {
        response.forEach((listRole: any) => {
          listRole.forEach((user: IUser) => {
            if (user.email === email) {
              this.user = user;
            }
          });
        });

        if (this.user == undefined) {
          resolve({
            error: true,
            msg: 'Email ou senha estão incorretos.',
            token: null,
            auth: false,
          });
          return;
        }

        const passwordIsCorrect = bcrypt.compareSync(
          password,
          this.user.password
        );
        if (!passwordIsCorrect) {
          resolve({
            error: true,
            msg: 'Email ou senha estão incorretos.',
            token: null,
            auth: false,
          });
          return;
        }

        resolve({ error: false, msg: 'Logado com sucesso' });
      });
    });
  }
}
