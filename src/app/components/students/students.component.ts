import { ChangeDetectorRef, Component } from '@angular/core';
import { KeysUser } from '../../pages/sign-up/sign-up';
import { IUser, RolesUser } from '../../../models/user.model';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { EditUserComponent } from '../../pages/edit-user/edit-user.component';
import { FilterEmitEventService } from '../../services/eventEmit.service';

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
  email!: string;

  modal: 'edit-student' | 'edit-teacher' = 'edit-student';

  constructor(
    private usersService: UsersService,
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef,
    private filterEmitEventService: FilterEmitEventService
  ) {}

  takeRoleInStorage() {
    return localStorage.getItem('role') as RolesUser;
  }

  async takeStudents() {
    return await this.usersService.findUsersInRole('student');
  }

  async ngOnInit() {
    this.students = await this.takeStudents();
    this.filterEmitEventService.events$.subscribe((data) => {
      if (data.users.students) {
        this.students = data.users.students;
      }
      this.cd.detectChanges();
    });
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
      'student',
      action,
      this.takeRoleInStorage()
    );
  }
  handleEdit(email: string) {
    this.email = email;
    console.log(email, 'oiiii');
    this.cd.detectChanges();
  }

  async handleDeleteUser(email: string) {
    this.students = await this.dashboardService.handleDeleteUser(
      email,
      'student',
      this.students
    );
  }
}
