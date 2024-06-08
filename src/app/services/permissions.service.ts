import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { RolesUser } from '../../models/user.model';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private authService: AuthService,
    private router: Router,
    private usersService: UsersService
  ) {}

  permissionAcessInSignUp() {
    const result = this.authService.isAuthenticated(false);
    const role = localStorage.getItem('role') as RolesUser | null;

    if (role == null || !result) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!['teacher', 'admin'].includes(role)) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  permissionAcessInSignIn() {
    const result = !this.authService.isAuthenticated(true);

    if (!result) {
      this.router.navigate(['/dashboard']);
    }
    return result;
  }

  permissionModificateUser(role: RolesUser, userRole: RolesUser): boolean {
    const adminPermission =
      userRole === 'admin' && ['teacher', 'admin', 'student'].includes(role);
    const teacherPermission = userRole === 'teacher' && role === 'student';
    const studentPermission = userRole === 'student' && false;

    return adminPermission || teacherPermission || studentPermission;
  }

  async permissionAcessInEdit(emailParams: string): Promise<boolean> {
    const result = this.permissionAcessInSignUp();

    if (!result) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    const user = await this.usersService.foundUser(emailParams);
    const role = localStorage.getItem('role') as RolesUser;

    if (user === undefined) return false;
    if (user.role === 'admin') return false;

    if (['teacher', 'admin'].includes(user.role) && role === 'student')
      return true;
    if (['teacher', 'student'].includes(user.role) && role === 'admin')
      return true;

    return false;
  }
}
