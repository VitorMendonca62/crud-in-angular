import { Component } from '@angular/core';
import { IUser, RolesUser } from '../../../models/user.model';
import { UsersService } from '../../services/users.service';
import { DashboardService } from '../../services/dashboard.service';
import { KeysUser } from '../layout/sign-up/sign-up';
import { CommonModule } from '@angular/common';
import {
  SearchEmitEventService,
} from '../../services/eventEmit.service';

type Actions = 'visible' | 'edit';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css',
})
export class AdminsComponent {
  admins!: IUser[];
  roleInStorage!: RolesUser;

  constructor(
    private usersService: UsersService,
    private dashboardService: DashboardService,
    private searchEmitEventService: SearchEmitEventService
  ) {}

  takeRoleInStorage() {
    return localStorage.getItem('role') as RolesUser;
  }

  async takeAdmins() {
    return await this.usersService.findUsersInRole('admin');
  }

  async ngOnInit() {
    this.admins = await this.takeAdmins();
    this.searchEmitEventService.events$.subscribe((data) => {
      if (data.users.admins) {
        this.admins = data.users.admins;
      }
    });
  }

  handleSort(reverse: boolean, key: KeysUser) {
    this.admins = this.dashboardService.handleSort(reverse, key, this.admins);
  }

  _definePermission(action: Actions) {
    return this.dashboardService._definePermission(
      'admin',
      action,
      this.takeRoleInStorage()
    );
  }
}
