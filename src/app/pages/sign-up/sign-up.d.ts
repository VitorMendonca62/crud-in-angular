import { IUser } from '../../../models/user.model';
export type KeysUser = 'email' | 'role' | 'number';

export type _ICreateUser = Omit<IUser, 'id'>;

export interface ICreateUser extends _ICreateUser {
  readonly confirmPassword: string;
}

export interface IResponseSingIn {
  msg: string;
  error: boolean;
}
