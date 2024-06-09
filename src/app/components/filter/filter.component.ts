import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';

type ClassFilter = "all" | "A" | "B" | "C"

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  filter = new FormGroup({classFilter: new FormControl("all")});
  constructor(private filterService: FilterService) {}

  handleFilterClass() {
    this.filterService.filterClass(this.filter.value.classFilter as ClassFilter)
  }
}
