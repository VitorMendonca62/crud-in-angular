import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const MustMatchPassword = (): ValidatorFn | null => {
  return (control: AbstractControl): ValidationErrors | null => {
    const match = control.get("password");
    const valueToMatch = control.get("confirmPassword");

    if (match?.value !== valueToMatch?.value) {
      valueToMatch?.setErrors({ mustMatch: true });
      return { mustMatch: true };
    }

    return null;
  };
};
