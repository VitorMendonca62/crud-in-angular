import { ChangeDetectorRef, Component } from '@angular/core';
import { KeysUser } from '../layout/sign-up/sign-up';
import { IUser, RolesUser } from '../../../models/user.model';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { EditUserComponent } from '../layout/edit-user/edit-user.component';
import {
  FilterEmitEventService,
  SearchEmitEventService,
} from '../../services/eventEmit.service';
import { FormGroup } from '@angular/forms';
import { FilterComponent } from '../filter/filter.component';

type Actions = 'visible' | 'edit';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, EditUserComponent, FilterComponent],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
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
    private searchEmitEventService: SearchEmitEventService,
    private filterEmitEventService: FilterEmitEventService
  ) {}

  takeRoleInStorage() {
    return localStorage.getItem('role') as RolesUser;
  }

  async takeStudents() {
    console.log('oi7');
    return await this.usersService.findUsersInRole('student');
  }

  async ngOnInit() {
    this.students = await this.takeStudents();
    this.searchEmitEventService.events$.subscribe((data) => {
      console.log('oi8');
      if (data.users.students) {
        this.students = data.users.students;
      }
      this.cd.detectChanges();
    });
    this.filterEmitEventService.events$.subscribe((data) => {
      console.log('oi6');
      if (data.students) {
        this.students = data.students;
      }
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
