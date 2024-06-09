import { Component } from '@angular/core';
import { IUser, RolesUser } from '../../../models/user.model';
import { UsersService } from '../../services/users.service';
import { DashboardService } from '../../services/dashboard.service';
import { KeysUser } from '../../pages/sign-up/sign-up';
import { CommonModule } from '@angular/common';

type Actions = 'visible' | 'delete' | 'edit';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admins.component.html',
})
export class AdminsComponent {
  admins!: IUser[];
  roleInStorage!: RolesUser;

  constructor(
    private usersService: UsersService,
    private dashboardService: DashboardService
  ) {}

  takeRoleInStorage() {
    return localStorage.getItem('role') as RolesUser;
  }

  async takeStudents() {
    return await this.usersService.findAllUsers('teacher');
  }

  async ngOnInit() {
    this.admins = await this.takeStudents();
  }

  handleSort(reverse: boolean, key: KeysUser) {
    this.admins = this.dashboardService.handleSort(reverse, key, this.admins);
  }

  _definePermission(action: Actions) {
    return this.dashboardService._definePermission(
      "admin",
      action,
      this.takeRoleInStorage()
    );
  }
}
