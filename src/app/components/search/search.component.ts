import { Component, EventEmitter, Output, input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
})
export class SearchComponent {
  constructor(private usersService: UsersService) {}
}
