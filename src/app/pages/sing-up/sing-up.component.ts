import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  // Inputs
  constructor(
    private globalEventService: GlobalEventService,
    private singUpService: SingUpService
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
    this.singup = new FormGroup(
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
        email: new FormControl('', [Validators.required, Validators.email]),
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
  }

  ngOnInit(): void {
    this.defineFormGroupSingUp();
  }

  isSubmit = false;
  userSingUp(): void {
    this.isSubmit = true;

    if (!this.singup.valid) {
      this.globalEventService.emitEvent({ singup: this.singup });
    } else {
      // this.singUpService
      //   .createUser(this.singup.value)
      //   .subscribe((user) => console.log(user));
    }
  }
}
