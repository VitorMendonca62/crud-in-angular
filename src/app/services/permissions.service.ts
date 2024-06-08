import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { RolesUser } from '../../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private authService: AuthService, private router: Router) {}

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
}
