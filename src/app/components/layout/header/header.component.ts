import { Component } from '@angular/core';
import { SearchComponent } from '../../search/search.component';
import { RolesUser } from '../../../../models/user.model';
import { EmitEventService } from '../../../services/eventEmit.service';
import { SearchService } from '../../../services/search.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SearchComponent,
    ReactiveFormsModule,
    SignUpComponent,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private emitEventService: EmitEventService,
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  public search = new FormGroup({});

  takeRoleInStorage() {
    return localStorage.getItem('role') as RolesUser;
  }

  permissionSingUp() {
    return ['teacher', 'admin'].includes(this.takeRoleInStorage());
  }

  handleSearchUser() {
    this.searchService.searchUsers();
  }

  handleLogout() {
    this.authService.logoutUser();
  }
}
