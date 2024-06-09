import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { SearchEmitEventService } from './eventEmit.service';
import { FilterService } from './filter.service';

type ClassFilter = 'all' | 'A' | 'B' | 'C';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private usersService: UsersService,
    private searchEmitEventService: SearchEmitEventService,
    private filterService: FilterService
  ) {}

  async searchUsers() {
    const appSearch = document.querySelector('app-search');
    const inputElement = appSearch?.querySelector('input');

    if (!inputElement) return;

    const inputsRadios = Array.from(
      document.querySelectorAll('input[type=radio]')
    ) as HTMLInputElement[];

    const classChecked = inputsRadios.reduce((previus, accumulator) => {
      if (previus.checked) {
        return previus;
      }
      return accumulator;
    }).value as ClassFilter;
    const nameSearch = inputElement.value;
    
    const usersInClass = await this.filterService.filterClass(classChecked);

    if (classChecked === 'all') {
      this.usersService.filterByName(nameSearch.toLowerCase()).then((users) => {
        this.searchEmitEventService.emitEvent({ users });
      });
      return;
    }
    this.usersService
      .filterByNameWithClass(nameSearch.toLowerCase(), usersInClass)
      .then((users) => {
        this.searchEmitEventService.emitEvent({ users });
      });
  }
}
