import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { KeysUser } from '../../pages/sign-up/sign-up';
import { IUser, RolesUser } from '../../../models/user.model';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { EditUserComponent } from '../../pages/edit-user/edit-user.component';
import { FilterService } from '../../services/filter.service';
import {
  EmitEventService,
  FilterEmitEventService,
} from '../../services/eventEmit.service';

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

  modal: 'edit-student' | 'edit-teacher' = 'edit-teacher';

  constructor(
    private usersService: UsersService,
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef,
    private filterEmitEventService: FilterEmitEventService
  ) {}

  takeRoleInStorage() {
    return localStorage.getItem('role') as RolesUser;
  }

  async takeTeachers() {
    return await this.usersService.findUsersInRole('teacher');
  }

  async ngOnInit() {
    this.teachers = await this.takeTeachers();
    this.filterEmitEventService.events$.subscribe((data) => {
      if (data.users.teachers) {
        this.teachers = data.users.teachers;
      }
    });
    this.cd.detectChanges();
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
    this.cd.detectChanges();
  }

  async handleDeleteUser(email: string) {
    this.teachers = await this.dashboardService.handleDeleteUser(
      email,
      'teacher',
      this.teachers
    );
  }
}
