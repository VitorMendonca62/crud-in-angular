export interface IInputsEdit {
  inputEmail: IPropsInput;
  inputName: IPropsInput;
  inputNumber: IPropsInput;
}

export interface IUserEdit {
  name: string;
  email: string;
  number: string;
  class: "A" | "B" | "C"
}
