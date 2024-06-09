import { Component, EventEmitter, Output, input } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  constructor(private usersService: UsersService) {}
}
