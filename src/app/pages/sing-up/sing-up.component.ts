import { Component } from '@angular/core';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [InputFormsComponent, ButtonComponent],
  templateUrl: './sing-up.component.html',
  styles: [
    `
      form {
        width: 30rem;
      }
    `,
  ],
})
export class SingUpComponent {
  inputName: IPropsInput = {
    title: 'Nome completo',
    nameInput: 'name',
    placeholder: 'Nome completo',
    type: 'text',
  };

  inputEmail: IPropsInput = {
    title: 'Email',
    nameInput: 'email',
    placeholder: 'exemplo@exemplo.com',
    type: 'email',
  };

  inputPassword: IPropsInput = {
    title: 'Senha',
    nameInput: 'password',
    placeholder: '*********',
    type: 'password',
  };

  inputConfirmPassword: IPropsInput = {
    title: 'Confirmar senha',
    nameInput: 'confirmPassword',
    placeholder: '**********',
    type: 'password',
  };

  buttonSubmit: IPropsButton = {
    type: 'submit',
    text: 'Cadastrar',
  };
}
