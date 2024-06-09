import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { KeysUser } from '../../pages/sign-up/sign-up';
import { IUser, RolesUser } from '../../../models/user.model';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { EditUserComponent } from '../../pages/edit-user/edit-user.component';

type Actions = 'visible' | 'delete' | 'edit';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [CommonModule, EditUserComponent],
  templateUrl: './teachers.component.html',
})
export class TeachersComponent {
  teachers!: IUser[];
  roleInStorage!: RolesUser;
  email!: string;

  modal: "edit-student" | "edit-teacher" = "edit-teacher"

  constructor(
    private usersService: UsersService,
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef

  ) {}

  takeRoleInStorage() {
    return localStorage.getItem('role') as RolesUser;
  }

  async takeStudents() {
    return await this.usersService.findAllUsers('teacher');
  }

  async ngOnInit() {
    this.teachers = await this.takeStudents();
  }

  handleSort(reverse: boolean, key: KeysUser) {
    this.teachers = this.dashboardService.handleSort(
      reverse,
      key,
      this.teachers
    );
  }

  _definePermission(action: Actions) {
    return this.dashboardService._definePermission(
      'teacher',
      action,
      this.takeRoleInStorage()
    );
  }
  handleEdit(email: string) {
    this.email = email;
    this.cd.detectChanges()
  }

  async handleDeleteUser(email: string) {
    this.teachers = await this.dashboardService.handleDeleteUser(
      email,
      'teacher',
      this.teachers
    );
  }
}
