import { Component, EventEmitter, Output } from '@angular/core';
import { FilterComponent } from '../../filter/filter.component';
import { IUser } from '../../../../models/user.model';
import { EmitEventService } from '../../../services/eventEmit.service';
import { FilterService } from '../../../services/filter.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from '../../../pages/sign-up/sign-up.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FilterComponent,
    ReactiveFormsModule,
    SignUpComponent,

  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(
    private emitEventService: EmitEventService,
    private filterService: FilterService
  ) {}

  public search = new FormGroup({});

  async handleFilterUser() {
    const users = await this.filterService.filterUsers();
    this.emitEventService.emitEvent({ users: users });
  }
}
