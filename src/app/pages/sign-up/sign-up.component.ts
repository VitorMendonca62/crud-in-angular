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
import { ICreateUser, IInputsSingUp } from './sign-up';
import { RolesUser } from '../../../models/user.model';
import { takeFormGroupSignUp } from '../../../utils/sign';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  inputName,
  inputConfirmPassword,
  inputEmail,
  inputNumber,
  inputPassword,
} from '../../../utils/sign';
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
  messageAlert!: string;
  userRole!: RolesUser;

  // Inputs
  constructor(
    private globalEventService: GlobalEventService,
    private signUpService: SignUpService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  inputs: IInputsSingUp = {
    inputName,
    inputConfirmPassword,
    inputEmail,
    inputNumber,
    inputPassword,
  };

  // Inputs Validation
  public signup!: FormGroup;

  takeRoleInStorage() {
    this.userRole = localStorage.getItem('role') as RolesUser;
  }

  defineFormGroupSignUp(): void {
    this.signup = takeFormGroupSignUp();
  }

  ngOnInit(): void {
    this.authService.permissionInSignUp();
    this.defineFormGroupSignUp();
    this.takeRoleInStorage();

    this.usersService.foundAllUsers();
  }

  isSubmit = false;

  toDashboard() {
    this.router.navigate(['dashboard']);
  }

  showAlert() {
    document.querySelector('[role=alert]')?.classList.toggle('hide');
    document.querySelector('[role=alert]')?.classList.toggle('show');
  }

  clearAllInputs() {
    this.defineFormGroupSignUp();
    this.isSubmit = false;
    this.isInDatabase = false;

    document.querySelectorAll('input').forEach((input) => (input.value = ''));

    const selectElement = document.querySelector('select');
    if (selectElement) selectElement.value = 'student';
  }

  async userSignUp(): Promise<undefined> {
    this.isSubmit = true;

    if (!this.signup.valid) {
      this.globalEventService.emitEvent({ formGroup: this.signup });
      return;
    }

    const response = await this.signUpService.createUser(
      this.signup.value as ICreateUser,
      this.userRole
    );

    this.messageAlert = response.msg;
    this.isInDatabase = response.error;

    const button = document.querySelector(
      'button[type=submit]'
    ) as HTMLButtonElement;

    button.disabled = true;
    this.showAlert();

    setTimeout(() => {
      if (!this.isInDatabase) {
        this.clearAllInputs();
      }

      button.disabled = false;
      this.showAlert();
    }, 3500);

    this.cd.detectChanges();
  }
}
