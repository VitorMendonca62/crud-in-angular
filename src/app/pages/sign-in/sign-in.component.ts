import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GlobalEventService } from '../../services/eventEmit.service';
import { ILoginUser } from './sign';
import { SignInService } from './sign-in.service';
import { takeFormGroupSignIn } from '../../../utils/sign';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
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
    private globalEventService: GlobalEventService,
    private signInService: SignInService,
    private cd: ChangeDetectorRef,
    private authService: AuthService
  ) {}

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

  async userSignIn(): Promise<undefined> {
    this.isSubmit = true;

    if (!this.signin.valid) {
      this.globalEventService.emitEvent({ formGroup: this.signin });
      return;
    }
    const response = (await this.signInService.loginUser(
      this.signin.value as ILoginUser
    )) as { error: boolean; msg: string };

    this.messageAlert = response.msg;
    this.showAlert();
    this.cd.detectChanges();

    if (!response.error) {
      this.authService.authenticate();
      setTimeout(() => {
        location.href = '/dashboard';
      }, 3500);
    }

    return;
  }
}
