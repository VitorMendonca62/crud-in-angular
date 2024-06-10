import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { FilterEmitEventService } from './eventEmit.service';

type ClassFilter = 'all' | 'A' | 'B' | 'C';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor(
    private usersService: UsersService,
    private filterEventEmitService: FilterEmitEventService
  ) {}

  filterClass(classUser: ClassFilter) {
    console.log("oi2")
    return this.usersService.findUsersInRole('student').then(async (users) => {
      const appSearch = document.querySelector('app-search');
      const inputElement = appSearch?.querySelector('input');

      const nameSearch = inputElement?.value;

      if (nameSearch && nameSearch.length > 0) {
        users = (await this.usersService.filterByName(nameSearch.toLowerCase()))
          .students;
      }

      if (classUser === 'all') {
        this.filterEventEmitService.emitEvent({ students: users });
        return users;
      }

      const usersFiltered = users.filter((user) => user.class === classUser);
      this.filterEventEmitService.emitEvent({ students: usersFiltered });
      return usersFiltered;
    });
  }
}
