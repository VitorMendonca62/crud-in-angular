export type RolesUser = 'student' | 'teacher' | 'admin';

export interface IUser {
  readonly id: string;
  readonly number: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: RolesUser;
}
