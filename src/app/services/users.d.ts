import { IUser } from "../../models/user.model";

export interface IData {
  students: IUser[];
  teachers: IUser[];
  admins: IUser[];
}
