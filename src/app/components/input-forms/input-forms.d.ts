interface IPropsInput {
  title: string;
  type: 'text' | 'password' | 'email';
  nameInput: 'name' | 'email' | 'password' | 'confirmPassword' | 'number';
  placeholder: string;
}

interface IValidateErrors {
  [key: string]: string;
}

interface ValidationMessages {
  required?: string;
  minLength?: string;
  email?: string;
  mustMatch?: string;
  pattern?: string;
}

interface ResponseValidation {
  name: ValidationMessages;
  email: ValidationMessages;
  password: ValidationMessages;
  confirmPassword: ValidationMessages;
}
