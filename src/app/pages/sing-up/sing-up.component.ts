import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MustMatchPassword } from '../../../utils/user';
import { CommonModule } from '@angular/common';
import { GlobalEventService } from '../../services/eventEmit.service';
import { SingUpService } from './sing-up.service';
import { HttpClient } from '@angular/common/http';
import { ICreateUser } from './sing-up';
import { IUser } from '../../../models/user.model';
import { takeFormGroup } from '../../../utils/singup';

@Component({
  selector: 'app-singup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, InputFormsComponent, ReactiveFormsModule],
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
  isInDatabase: boolean = false;
  messageAlert: string =
    'Já existe um usuário com esses dados. Tente novamente';

  // Inputs
  constructor(
    private globalEventService: GlobalEventService,
    private singUpService: SingUpService,
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
  public singup!: FormGroup;

  defineFormGroupSingUp(): void {
    this.singup = takeFormGroup();
  }

  ngOnInit(): void {
    this.defineFormGroupSingUp();
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

  userSingUp(): undefined {
    this.isSubmit = true;

    if (!this.singup.valid) {
      this.globalEventService.emitEvent({ singup: this.singup });
      return;
    }
    const { email, number } = this.singup.value as ICreateUser;

    if (this.isInDatabase) {
      this.isInDatabase = false;
      return;
    }

    this.singUpService.foundAllUsers().subscribe((response: Response[]) => {
      response.forEach((listRole: any) => {
        listRole.forEach((user: IUser) =>
          this.verifyIsInDatabase(email, number, user)
        );
      });

      if (this.isInDatabase) {
        this.showAlert();
        return;
      } else {
        this.singUpService
          .createUser(this.singup.value as ICreateUser)
          .subscribe((isValid) => isValid);
        this.isInDatabase = false;
      }
      this.cd.detectChanges();
    });
  }
}
