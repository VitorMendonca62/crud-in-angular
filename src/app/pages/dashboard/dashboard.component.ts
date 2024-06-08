import { ChangeDetectorRef, Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser, RolesUser } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { IPermissions } from './dashboard';
import { Router } from '@angular/router';

type Actions = 'visible' | 'delete' | 'edit';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
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

  definePermission(role: RolesUser, action: Actions) {
    const permissions: IPermissions = {
      visible: {
        admin: this.inUserRole === 'admin',
        teacher: ['teacher', 'admin', 'student'].includes(this.inUserRole),
        student: ['teacher', 'student', 'admin'].includes(this.inUserRole),
      },
      delete: {
        admin: false,
        teacher: this.inUserRole === 'admin',
        student: ['teacher', 'admin'].includes(this.inUserRole),
      },
      edit: {
        admin: false,
        teacher: this.inUserRole === 'admin',
        student: ['teacher', 'admin'].includes(this.inUserRole),
      },
    };

    return permissions[action][role];
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
    const sla = await this.usersService.deleteUser(email, role);
    this.users = sla.users;
    this.cd.detectChanges();
  }

  async takeAllUsers() {
    this.users = await this.usersService.foundAllUsers();
  }

  ngOnInit(): void {
    this.takeAllUsers();
    this.takeLocationData();
  }
}
