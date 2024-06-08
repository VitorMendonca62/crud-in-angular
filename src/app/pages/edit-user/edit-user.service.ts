import { Injectable } from '@angular/core';
import { IUser, RolesUser } from '../../../models/user.model';
import { IUserEdit } from './edit';
import { SignUpService } from '../sign-up/sign-up.service';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EditUserService extends SignUpService {
  async editUser(
    user: IUserEdit,
    role: RolesUser,
    id: string,
    emailUser: string,
    numberUser: string,
    userRole: RolesUser
  ) {
    const { email, name, number } = user;

    let isInDatabase = true;
    if (email !== emailUser && number !== numberUser) {
      isInDatabase = await super.verifyIsInDatabase(email, number);
    }
    if (email === emailUser && number !== numberUser) {
      isInDatabase = await super.verifyIsInDatabase('', number);
    }
    if (email !== emailUser && number === numberUser) {
      isInDatabase = await super.verifyIsInDatabase(email, '');
    }

    if (!isInDatabase) {
      return {
        error: true,
        msg: this.messageAlert,
      };
    }

    const url = `${environment.hostApiUrl}/${role}s/${id}`;

    if (super.definePermission(role, userRole)) {
      const observable = this.http.patch<Response>(url, {
        number,
        name,
        email: email.toLowerCase(),
      });

      observable.subscribe((response) => response);

      return {
        error: false,
        msg: 'Usuário editado com sucesso',
      };
    }
    return {
      error: true,
      msg: 'Algo de errado na criação de cargos!',
    };
  }
}
