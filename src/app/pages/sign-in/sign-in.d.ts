import { RolesUser } from '../../../models/user.model';

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IResponse {
  error: boolean;
  msg: string;
  role: RolesUser | undefined;
}

export interface IInputsSingIn {
  inputEmail: IPropsInput;
  inputPassword: IPropsInput;
}
