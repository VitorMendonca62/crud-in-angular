import { Injectable } from '@angular/core';
import bcrypt from 'bcryptjs';
import { IUser } from '../../../models/user.model';
import { ILoginUser, IResponse } from './sign-in';
import { UsersService } from '../../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private usersService: UsersService) {}
  private user: IUser | undefined;

  async loginUser(inputUser: ILoginUser): Promise<IResponse> {
    const { email, password } = inputUser;

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

    this.user = await this.usersService.findUser(email, 'all');

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
