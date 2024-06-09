export type RolesUser = 'student' | 'teacher' | 'admin';
export type ClassUser = "A" | "B" | "C"

export interface IUser {
  readonly id: string;
  readonly number: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: RolesUser;
  readonly class: ClassUser;

}
