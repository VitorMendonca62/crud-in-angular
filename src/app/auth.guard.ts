import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';
import { PermissionsService } from './services/permissions.service';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuthenticated(false);
};

export const noAuthGuard: CanActivateFn = (route, state) => {
  return inject(PermissionsService).permissionAcessInSignIn();
};


