export interface ICreateUser {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly confirmPassword: string;
  readonly role: "student" | "teacher" | "admin"
}
