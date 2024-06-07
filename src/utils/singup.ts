import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatchPassword } from './user';

export const takeFormGroup = () =>
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
