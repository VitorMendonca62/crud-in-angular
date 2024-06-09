import { ChangeDetectorRef, Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser, RolesUser } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { IPermissions } from './dashboard';
import { Router } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import { definePermission } from '../../../utils/dashboard';

type Actions = 'visible' | 'delete' | 'edit';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FilterComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  inUserRole!: RolesUser;

  constructor(
    private usersService: UsersService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}

  users: IUser[] = [];

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
  }
}
