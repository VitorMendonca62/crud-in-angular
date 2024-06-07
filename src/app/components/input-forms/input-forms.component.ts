import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-forms',
  standalone: true,
  imports: [],
  templateUrl: './input-forms.component.html',
})
export class InputFormsComponent {
  @Input() props: IPropsInput | undefined = undefined;

}
