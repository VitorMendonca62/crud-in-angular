import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmitEventService } from '../../services/eventEmit.service';
import { IInputsSingIn, ILoginUser, IResponse } from './sign-in';
import { SignInService } from './sign-in.service';
import {
  inputEmail,
  inputPassword,
  } from '../../../utils/sign/inputs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RolesUser } from '../../../models/user.model';
import { Router } from '@angular/router';
import { takeFormGroupSignIn } from '../../../utils/sign/formsGroups';

@Component({
  selector: 'app-signin',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, InputFormsComponent, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styles: [
    `
      form {
        width: 30rem;
      }
    `,
  ],
})
export class SignInComponent {
  isInDatabase: boolean = false;
  messageAlert: string | undefined;

  // Inputs
  constructor(
    private emitEventService: EmitEventService,
    private signInService: SignInService,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {}

  inputs: IInputsSingIn  = { inputPassword, inputEmail };

  public signin!: FormGroup;

  defineFormGroupSignIn(): void {
    this.signin = takeFormGroupSignIn();
  }

  ngOnInit(): void {
    this.defineFormGroupSignIn();
  }

  isSubmit = false;

  showAlert() {
    document.querySelector('[role=alert]')?.classList.remove('hide');
    document.querySelector('[role=alert]')?.classList.add('show');
    this.isInDatabase = false;
  }

  handleLoginSucess(role: RolesUser | undefined) {
    if (role) {
      this.authService.authenticate(role);
      setTimeout(() => this.router.navigate(['dashboard']), 3500);
    }
  }

  async handleLogin(): Promise<void> {
    const userInput = this.signin.value as ILoginUser;
    const response = this.signInService.loginUser(userInput);

    this.messageAlert = (await response).msg;
    this.showAlert();
    this.cd.detectChanges();

    if (!(await response).error) {
      this.handleLoginSucess((await response).role);
    }
  }

  async userSignIn(): Promise<undefined> {
    this.isSubmit = true;

    if (!this.signin.valid) {
      this.emitEventService.emitEvent({ formGroup: this.signin });
      return;
    }
    this.handleLogin();

    return;
  }
}
