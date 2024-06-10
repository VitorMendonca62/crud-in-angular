import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersComponent } from '../../components/teachers/teachers.component';
import { StudentsComponent } from '../../components/students/students.component';
import { AdminsComponent } from '../../components/admins/admins.component';
import { HeaderComponent } from '../../components/layout/header/header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TeachersComponent,
    StudentsComponent,
    AdminsComponent,
    HeaderComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor() {}
}
