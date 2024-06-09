import { Component, EventEmitter, Output, input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  @Output() filteredUsers = new EventEmitter<IUser[]>();

  constructor(private usersService: UsersService) {}
  async handleFilter() {
    const appFilter = document.querySelector('app-filter');
    const inputElement = appFilter?.querySelector('input');

    if (!inputElement) return;

    const nameFilter = inputElement.value;
    const usersFiltered = await this.usersService.filterByName(
      nameFilter.toLowerCase()
    );
    this.filteredUsers.emit(usersFiltered);
  }
}
