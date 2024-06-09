import { Injectable } from '@angular/core';
import { KeysUser } from '../components/layout/sign-up/sign-up';
import { IUser, RolesUser } from '../../models/user.model';
import { definePermission } from '../../utils/dashboard';
import { UsersService } from './users.service';

type Actions = 'visible' | 'delete' | 'edit';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private usersService: UsersService) {}

  handleSort(reverse: boolean, key: KeysUser, users: IUser[]) {
    return users.sort((user1: IUser, user2: IUser) => {
      const valueOne = user1[key].toLowerCase();
      const valueTwo = user2[key].toLowerCase();
      const comparison = valueOne.localeCompare(valueTwo);

      return reverse ? comparison : -comparison;
    });
  }


  _definePermission(role: RolesUser, action: Actions, inUserRole: RolesUser) {
    return definePermission(role, action, inUserRole);
  }

  async handleDeleteUser(email: string, role: RolesUser, users: IUser[]) {
    const response = await this.usersService.deleteUser(email, role, users);
    return response.users;
  }
}
