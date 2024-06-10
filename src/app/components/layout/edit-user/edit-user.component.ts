import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser, RolesUser } from '../../../../models/user.model';
import { UsersService } from '../../../services/users.service';
import { InputFormsComponent } from '../../input-forms/input-forms.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmitEventService } from '../../../services/eventEmit.service';
import {
  inputEmail,
  inputName,
  inputNumber,
} from '../../../../utils/sign/inputs';
import { takeFormGroupEdit } from '../../../../utils/sign/formsGroups';
import { IInputsEdit, IUserEdit } from './edit';
import { CommonModule } from '@angular/common';
import { EditUserService } from './edit-user.service';
import { showAlert } from '../../../../utils/general';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, InputFormsComponent, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent {
  @Input() email!: string;
  @Input() users!: IUser[];
  @Input() modal!: 'edit-student' | 'edit-teacher';
  messageAlert!: string;

  user!: IUser | undefined;
  isInDatabase: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private emitEventService: EmitEventService,
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
    return await this.usersService.findUser(this.email, this.users);
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.user = await this.takeUser();
    this.edit = this.defineFormGroupEdit();
  }

  isSubmit: boolean = false;
  public edit!: FormGroup;

  defineFormGroupEdit(): FormGroup {
    if (this.user) {
      this.edit = takeFormGroupEdit(
        this.email,
        this.user?.number,
        this.user?.name
      );
    }
    return this.edit;
  }

  showAlert() {}

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

    this.isInDatabase = (await response).error;
    this.messageAlert = (await response).msg;

    const editUserElement = document.querySelector('app-edit-user');
    const button = editUserElement?.querySelector(
      'button[type=submit]'
    ) as HTMLButtonElement;

    button.disabled = true;
    showAlert('edit');

    setTimeout(() => {
      if (!this.isInDatabase) {
        location.reload();
      }

      button.disabled = false;
      showAlert('edit');
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
