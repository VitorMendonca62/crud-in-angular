import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(private usersService: UsersService) {}
  
  async filterUsers() {
    const appFilter = document.querySelector('app-filter');
    const inputElement = appFilter?.querySelector('input');

    if (!inputElement) return;

    const nameFilter = inputElement.value;
    return await this.usersService.filterByName(nameFilter.toLowerCase());
  }
}
