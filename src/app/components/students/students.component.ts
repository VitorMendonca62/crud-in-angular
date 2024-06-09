import { Component } from '@angular/core';
import { KeysUser } from '../../pages/sign-up/sign-up';
import { IUser, RolesUser } from '../../../models/user.model';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { EditUserComponent } from '../../pages/edit-user/edit-user.component';

type Actions = 'visible' | 'delete' | 'edit';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, EditUserComponent],
  templateUrl: './students.component.html',
})
export class StudentsComponent {
  students!: IUser[];
  roleInStorage!: RolesUser;

  constructor(
    private usersService: UsersService,
    private dashboardService: DashboardService
  ) {}

  takeRoleInStorage() {
    return localStorage.getItem('role') as RolesUser;
  }

  async takeStudents() {
    return await this.usersService.findAllUsers('student');
  }

  async ngOnInit() {
    this.students = await this.takeStudents();
  }

  handleSort(reverse: boolean, key: KeysUser) {
    this.students = this.dashboardService.handleSort(
      reverse,
      key,
      this.students
    );
  }

  _definePermission(action: Actions) {
    return this.dashboardService._definePermission(
      "student",
      action,
      this.takeRoleInStorage()
    );
  }


  async handleDeleteUser(email: string) {
    this.students = await this.dashboardService.handleDeleteUser(email, "student", this.students);
  }
}
