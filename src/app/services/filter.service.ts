import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { FilterEmitEventService } from './eventEmit.service';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(
    private usersService: UsersService,
    private filterEmitEventService: FilterEmitEventService
  ) {}

  async filterUsers() {
    const appFilter = document.querySelector('app-filter');
    const inputElement = appFilter?.querySelector('input');

    if (!inputElement) return;

    const nameFilter = inputElement.value;
    // if(nameFilter === "") {
    //   const users =
    //   this.usersService.finf
    // }

    this.usersService.filterByName(nameFilter.toLowerCase()).then((users) => {
      this.filterEmitEventService.emitEvent({ users });
    });
  }
}
