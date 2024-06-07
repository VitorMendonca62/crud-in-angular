import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalEventService } from '../../services/eventEmit.service';
import { SignUpService } from './sign-up.service';
import { ICreateUser } from './sign-up';
import { IUser } from '../../../models/user.model';
import { takeFormGroupSignUp } from '../../../utils/sign';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, InputFormsComponent, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',

  styles: [
    `
      form {
        width: 30rem;
      }
    `,
  ],
})
export class SignUpComponent {
  isInDatabase: boolean = false;
  messageAlert: string =
    'Já existe um usuário com esses dados. Tente novamente';

  // Inputs
  constructor(
    private globalEventService: GlobalEventService,
    private signUpService: SignUpService,
    private usersService: UsersService,
    private cd: ChangeDetectorRef
  ) {}

  inputNumber: IPropsInput = {
    title: 'Matrícula',
    nameInput: 'number',
    placeholder: '123456',
    type: 'text',
  };

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

  // Inputs Validation
  public signup!: FormGroup;

  defineFormGroupSignUp(): void {
    this.signup = takeFormGroupSignUp();
  }

  ngOnInit(): void {
    this.defineFormGroupSignUp();
  }

  isSubmit = false;

  verifyIsInDatabase(email: string, number: string, user: IUser) {
    if (user.email === email || user.number === number) {
      this.isInDatabase = true;
      if (user.email === email) {
        this.messageAlert =
          'Já existe um usuário com esse email. Tente novamente';
      }
      if (user.number === number) {
        this.messageAlert =
          'Já existe um usuário com essa matrícula. Tente novamente';
      }
    }
  }

  showAlert() {
    document.querySelector('[role=alert]')?.classList.remove('hide');
    document.querySelector('[role=alert]')?.classList.add('show');
    this.isInDatabase = false;
  }

  userSignUp(): undefined {
    this.isSubmit = true;

    if (!this.signup.valid) {
      this.globalEventService.emitEvent({ formGroup: this.signup });
      return;
    }
    const { email, number } = this.signup.value as ICreateUser;

    this.usersService.foundAllUsers().subscribe((response: Response[]) => {
      response.forEach((listRole: any) => {
        listRole.forEach((user: IUser) =>
          this.verifyIsInDatabase(email, number, user)
        );
      });

      if (this.isInDatabase) {
        this.showAlert();
        return;
      } else {
        this.signUpService
          .createUser(this.signup.value as ICreateUser)
          .subscribe((isValid) => isValid);
        this.isInDatabase = false;
      }
      this.cd.detectChanges();
    });
  }
}
