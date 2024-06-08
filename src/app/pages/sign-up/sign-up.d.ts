import { IUser } from '../../../models/user.model';
export type KeysUser = 'email' | 'role' | 'number';

export type _ICreateUser = Omit<IUser, 'id'>;

export interface ICreateUser extends _ICreateUser {
  readonly confirmPassword: string;
}

export interface IResponseWithOutRole {
  msg: string;
  error: boolean;
}

export interface IInputsSingUp {
  inputNumber: IPropsInput;
  inputName: IPropsInput;
  inputEmail: IPropsInput;
  inputPassword: IPropsInput;
  inputConfirmPassword: IPropsInput;
}
