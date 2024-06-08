import { IUser } from '../../../models/user.model';
import { IResponseWithOutRole } from '../sign-up/sign-up';

export interface IResponseWithOurRoleWithUsers extends IResponseWithOutRole {
  users: IUser[];
}

interface IInPermissions{
  admin: boolean;
 teacher: boolean;
  student: boolean;
}

export interface IPermissions {
  visible: IInPermissions;
  edit: IInPermissions;
  delete: IInPermissions;

}
