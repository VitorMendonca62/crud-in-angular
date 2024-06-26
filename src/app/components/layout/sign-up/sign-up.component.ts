import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { InputFormsComponent } from '../../input-forms/input-forms.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmitEventService } from '../../../services/eventEmit.service';
import { SignUpService } from './sign-up.service';
import { ICreateUser, IInputsSingUp } from './sign-up';
import { RolesUser } from '../../../../models/user.model';
import { takeFormGroupSignUp } from '../../../../utils/sign/formsGroups';
import { Router } from '@angular/router';
import {
  inputName,
  inputConfirmPassword,
  inputEmail,
  inputNumber,
  inputPassword,
} from '../../../../utils/sign/inputs';
import { showAlert } from '../../../../utils/general';
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
  isSubmit: boolean = false;
  visibleClassSelect: boolean = true;

  // Inputs
  inputs: IInputsSingUp = {
    inputName,
    inputConfirmPassword,
    inputEmail,
    inputNumber,
    inputPassword,
  };

  constructor(
    private emitEventService: EmitEventService,
    private signUpService: SignUpService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  public signup!: FormGroup;

  takeRoleInStorage() {
    this.userRole = localStorage.getItem('role') as RolesUser;
  }

  defineFormGroupSignUp(): void {
    this.signup = takeFormGroupSignUp();
  }

  ngOnInit(): void {
    this.defineFormGroupSignUp();
    this.takeRoleInStorage();
  }

  toDashboard() {
    this.router.navigate(['dashboard']);
  }

  clearAllInputs() {
    this.defineFormGroupSignUp();
    this.isSubmit = false;
    this.isInDatabase = false;

    document.querySelectorAll('input').forEach((input) => (input.value = ''));

    const selectElement = document.querySelector('select');
    if (selectElement) selectElement.value = 'student';
  }

  handleAfterSignUp() {
    const signUpElement = document.querySelector('app-signup');
    const button = signUpElement?.querySelector(
      'button[type=submit]'
    ) as HTMLButtonElement;

    button.disabled = true;
    showAlert('signup');

    setTimeout(() => {
      if (!this.isInDatabase) {
        this.clearAllInputs();
      }

      button.disabled = false;
      showAlert('signup');
    }, 3500);
  }

  async handleSignUp() {
    const response = await this.signUpService.createUser(
      this.signup.value as ICreateUser,
      this.userRole
    );

    this.messageAlert = response.msg;
    this.isInDatabase = response.error;

    this.handleAfterSignUp();

    this.cd.detectChanges();
  }

  userSignUp(): undefined {
    this.isSubmit = true;

    if (!this.signup.valid) {
      this.emitEventService.emitEvent({ formGroup: this.signup });
      return;
    }

    this.handleSignUp();
  }

  toggleClassSelect() {
    const select = document.querySelector(
      '#select-signup-role'
    ) as HTMLSelectElement;
    if (select.value === 'student') {
      this.visibleClassSelect = true;
    } else {
      this.visibleClassSelect = false;
    }
  }
}
