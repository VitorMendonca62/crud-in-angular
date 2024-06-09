import { ChangeDetectorRef, Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser, RolesUser } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { IPermissions } from './dashboard';
import { Router } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import { definePermission } from '../../../utils/dashboard';
import { KeysUser } from '../sign-up/sign-up';
import { EmitEventService } from '../../services/eventEmit.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

type Actions = 'visible' | 'delete' | 'edit';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FilterComponent, EditUserComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  inUserRole!: RolesUser;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private emitEventService: EmitEventService
  ) {}

  users: IUser[] = [];

  rowsClass = 'd-flex flex-row justify-content-center align-items-center';

  handleEdit(email: string) {
    this.router.navigate(['edito', email]);
  }

  _definePermission(role: RolesUser, action: Actions, inUserRole: RolesUser) {
    return definePermission(role, action, inUserRole);
  }

  takeLocationData() {
    this.inUserRole = localStorage.getItem('role') as RolesUser;
  }

  formatingRole(role: RolesUser) {
    const roles = {
      student: 'estudante',
      admin: 'administrador',
      teacher: 'professor',
    };

    return roles[role];
  }

  async handleDeleteUser(email: string, role: RolesUser) {
    const response = await this.usersService.deleteUser(email, role);
    this.users = response.users;
  }
  async onUsersFiltered(users: IUser[]) {
    this.users = users;
  }

  async takeAllUsers() {
    this.users = await this.usersService.findAllUsers();
  }

  logoutUser() {
    localStorage.removeItem('authorization');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('role');

    this.router.navigate(['login']);
  }

  async ngOnInit(): Promise<void> {
    this.takeAllUsers();
    this.takeLocationData();
    this.emitEventService.events$.subscribe((data: { users: IUser[] }) => {
      this.users = data.users;
    });
  }

  handleSort(reverse: boolean, key: KeysUser) {
    this.users.sort((user1: IUser, user2: IUser) => {
      const valueOne = user1[key].toLowerCase();
      const valueTwo = user2[key].toLowerCase();
      const comparison = valueOne.localeCompare(valueTwo);

      return reverse ? -comparison : comparison;
    });
  }
}
