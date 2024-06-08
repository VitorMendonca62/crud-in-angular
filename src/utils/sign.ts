import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatchPassword } from './user';

export const takeFormGroupSignUp = () =>
  new FormGroup(
    {
      number: new FormControl('111111', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      name: new FormControl('awdawdawdawdaw', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('sla123@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('12345678', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('12345678', [
        Validators.required,
        Validators.minLength(8),
      ]),
      role: new FormControl('student', [Validators.required]),
    },
    { validators: MustMatchPassword() }
  );

export const takeFormGroupSignIn = () =>
  new FormGroup({
    password: new FormControl('12345678', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('sla123@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
  });

export const takeFormGroupEdit = (
  email: string,
  number: string,
  name: string
) =>
  new FormGroup({
    number: new FormControl(number, [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
    name: new FormControl(name, [Validators.required, Validators.minLength(4)]),
    email: new FormControl(email, [Validators.required, Validators.email]),
  });

export const inputNumber: IPropsInput = {
  title: 'Matrícula',
  nameInput: 'number',
  placeholder: '123456',
  type: 'text',
};

export const inputName: IPropsInput = {
  title: 'Nome completo',
  nameInput: 'name',
  placeholder: 'Nome completo',
  type: 'text',
};

export const inputEmail: IPropsInput = {
  title: 'Email',
  nameInput: 'email',
  placeholder: 'exemplo@exemplo.com',
  type: 'email',
};

export const inputPassword: IPropsInput = {
  title: 'Senha',
  nameInput: 'password',
  placeholder: '*********',
  type: 'password',
};

export const inputConfirmPassword: IPropsInput = {
  title: 'Confirmar senha',
  nameInput: 'confirmPassword',
  placeholder: '**********',
  type: 'password',
};
