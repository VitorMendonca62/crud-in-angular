import { Component, EventEmitter, Output } from '@angular/core';
import { FilterComponent } from '../../filter/filter.component';
import { IUser, RolesUser } from '../../../../models/user.model';
import { EmitEventService } from '../../../services/eventEmit.service';
import { FilterService } from '../../../services/filter.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from '../../../pages/sign-up/sign-up.component';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FilterComponent,
    ReactiveFormsModule,
    SignUpComponent,
    CommonModule,
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    private emitEventService: EmitEventService,
    private filterService: FilterService,
    private authService: AuthService
  ) {}

  public search = new FormGroup({});

  takeRoleInStorage() {
    return localStorage.getItem('role') as RolesUser;
  }

  permissionSingUp() {
    return ['teacher', 'admin'].includes(this.takeRoleInStorage());
  }

  async handleFilterUser() {
    const users = await this.filterService.filterUsers();
  }

  handleLogout() {
    this.authService.logoutUser();
  }
}
