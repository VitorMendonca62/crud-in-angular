import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, RolesUser } from '../../../models/user.model';
import { UsersService } from '../../services/users.service';
import { InputFormsComponent } from '../../components/input-forms/input-forms.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmitEventService } from '../../services/eventEmit.service';
import {
  inputConfirmPassword,
  inputEmail,
  inputPassword,
  inputName,
  inputNumber,
} from '../../../utils/sign/inputs';
import { takeFormGroupEdit } from '../../../utils/sign/formsGroups';
import { IInputsEdit, IUserEdit } from './edit';
import { CommonModule } from '@angular/common';
import { EditUserService } from './edit-user.service';
import { showAlert } from '../../../utils/general';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, InputFormsComponent, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent {
  email!: string;
  user!: IUser | undefined;
  messageAlert!: string;
  isInDatabase: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private emitEventService: EmitEventService,
    private cd: ChangeDetectorRef,
    private editUserService: EditUserService
  ) {}

  inputs: IInputsEdit = {
    inputEmail,
    inputName,
    inputNumber,
  };

  takeEmail() {
    const email = this.route.snapshot.paramMap.get('email');
    if (email != null) {
      this.email = email;
      return;
    }
  }

  takeRole() {
    return localStorage.getItem('role') as RolesUser;
  }

  async takeUser() {
    console.log(this.email);
    return await this.usersService.findUser(this.email);
  }

  toDashboard() {
    this.router.navigate(['dashboard']);
  }

  async ngOnInit() {
    this.takeEmail();
    this.user = await this.takeUser();
    this.defineFormGroupEdit();

    if (this.user == undefined || this.user.role === 'admin') {
      this.router.navigate(['dashboard']);
    }
  }

  isSubmit: boolean = false;
  public edit!: FormGroup;

  defineFormGroupEdit(): void {
    if (this.user) {
      this.edit = takeFormGroupEdit(
        this.email,
        this.user?.number,
        this.user?.name
      );
    }
    this.cd.detectChanges();
  }

  async handleEdit(): Promise<void> {
    this.isSubmit = true;

    const userInput = this.edit.value as IUserEdit;
    const { id, role, email, number } = this.user as IUser;
    const response = this.editUserService.editUser(
      userInput,
      role,
      id,
      email,
      number,
      this.takeRole()
    );

    this.messageAlert = (await response).msg;
    this.isInDatabase = (await response).error;

    showAlert();
    this.cd.detectChanges();

    const button = document.querySelector(
      'button[type=submit]'
    ) as HTMLButtonElement;

    button.disabled = true;

    setTimeout(() => {
      if (!this.isInDatabase) {
        this.router.navigate(['dashboard']);
      }

      showAlert();
      button.disabled = false;
    }, 3500);
  }

  async userEdit(): Promise<undefined> {
    this.isSubmit = true;

    if (!this.edit.valid) {
      this.emitEventService.emitEvent({ formGroup: this.edit });
      return;
    }

    this.handleEdit();
  }
}
