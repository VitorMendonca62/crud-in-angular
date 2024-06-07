import { Component } from '@angular/core';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';

@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [InputFormsComponent,],
  templateUrl: './sing-in.component.html',
  styles: [
    `
      form {
        width: 30rem;
      }
    `,
  ],
})
export class SingInComponent {
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


}
