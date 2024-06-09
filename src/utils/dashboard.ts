import { IPermissions } from '../app/pages/dashboard/dashboard';
import { RolesUser } from '../models/user.model';

type Actions = 'visible' | 'delete' | 'edit';

export const definePermission = (
  role: RolesUser,
  action: Actions,
  inUserRole: RolesUser
) => {
  const permissions: IPermissions = {
    visible: {
      admin: inUserRole === 'admin',
      teacher: ['teacher', 'admin', 'student'].includes(inUserRole),
      student: ['teacher', 'student', 'admin'].includes(inUserRole),
    },
    delete: {
      admin: false,
      teacher: inUserRole === 'admin',
      student: ['teacher', 'admin'].includes(inUserRole),
    },
    edit: {
      admin: false,
      teacher: inUserRole === 'admin',
      student: ['teacher', 'admin'].includes(inUserRole),
    },
  };

  return permissions[action][role];
};
