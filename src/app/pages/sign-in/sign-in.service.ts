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
  private user: IUser | undefined;
  private email!: string;

  async foundUser(): Promise<IUser | undefined> {
    const users = await this.usersService.foundAllUsers();
    let i = 0;
    let running = true;
    let user: IUser | undefined;

    while (i < users.length && running) {
      user = users[i];
      running = user.email !== this.email.toLowerCase();
      i += 1;
    }

    return user;
  }

  async loginUser(inputUser: ILoginUser): Promise<IResponse> {
    const { email, password } = inputUser;
    this.email = email;

    const errorEmailOrPassword = (): IResponse => {
      return {
        error: true,
        msg: 'Email ou senha estão incorretos.',
        role: undefined,
      };
    };

    const verifyPassword = (password: string) => {
      return bcrypt.compareSync(password, (this.user as IUser).password);
    };

    this.user = await this.foundUser();

    console.log(this.user);
    if (this.user == undefined) {
      return errorEmailOrPassword();
    }

    const passwordIsCorrect = verifyPassword(password);

    if (!passwordIsCorrect) {
      return errorEmailOrPassword();
    }

    return {
      error: false,
      msg: 'Logado com sucesso',
      role: this.user.role,
    };
  }
}
