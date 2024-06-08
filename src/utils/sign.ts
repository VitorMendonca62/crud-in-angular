import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatchPassword } from './user';

export const takeFormGroupSignUp = () =>
  new FormGroup(
    {
      number: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      role: new FormControl('student', [Validators.required]),
    },
    { validators: MustMatchPassword() }
  );

export const takeFormGroupSignIn = () =>
  new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

