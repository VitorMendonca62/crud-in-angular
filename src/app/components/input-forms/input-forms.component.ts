import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmitEventService } from '../../services/eventEmit.service';
import { responseValidation } from '../../../utils/input';
@Component({
  selector: 'app-input-forms',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-forms.component.html',
})
export class InputFormsComponent {
  @Input() props!: IPropsInput;
  @Input() formGroup!: FormGroup;
  @Input() isSubmit: boolean = false;

  constructor(
    private emitEventService: EmitEventService,
    private cd: ChangeDetectorRef
  ) {}

  message: string = '';

  responseValidation = responseValidation;

  ngOnInit() {
    this.emitEventService.events$.subscribe((data) => {
      if (data.formGroup) {
        this.formGroup = data.formGroup;
        this.handlErrors();
      }
    });
  }

  handlErrors(): undefined {
    const errors = this.formGroup.get(this.props.nameInput)
      ?.errors as ValidationMessages;

    const inputElement = document.querySelector(
      `input[name=${this.props.nameInput}]`
    );

    if (errors) {
      const key = Object.keys(errors)[0];

      this.message = (
        this.responseValidation[this.props.nameInput] as {
          [key: string]: string;
        }
      )[key];

      inputElement?.classList.add('border-danger');
      inputElement?.classList.remove('border-secondary');
      return;
    }

    inputElement?.classList.remove('border-danger');
    inputElement?.classList.add('border-secondary');
    this.message = '';
    this.cd.detectChanges();
  }
}
