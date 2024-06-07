import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GlobalEventService } from '../../services/eventEmit.service';

@Component({
  selector: 'app-input-forms',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './input-forms.component.html',
})
export class InputFormsComponent implements OnChanges {
  @Input() props!: IPropsInput;
  @Input() singup!: FormGroup;
  @Input() isSubmit: boolean = false;

  constructor(
    private globalEventService: GlobalEventService,
    private cd: ChangeDetectorRef
  ) {}

  message: string = '';

  responseValidation = {
    number: {
      required: 'Matrícula é obrigatória',
      minlength: 'Matrícula não tem 6 (seis) caracteres',
      maxlength: 'Matrícula não tem 6 (seis) caracteres',
    },
    name: {
      required: 'Nome é obrigatório',
      minlength: 'Nome curto demais',
    },
    email: {
      required: 'Email é obrigatório',
      email: 'Tem que ser um email válido',
    },
    password: {
      required: 'Senha é obrigatória',
      minlength: 'Senha muita curta',
    },
    confirmPassword: {
      required: 'Confirmação de senha é obrigatória',
      mustMatch: 'As senhas não são iguais',
      minlength: 'Confirmação de senha muita curta',
    },
  };

  ngOnInit() {
    this.globalEventService.events$.subscribe((data) => {
      this.singup = data.singup;
      this.handlErrors();
    });
  }

  handlErrors(): undefined {
    const errors = this.singup.get(this.props.nameInput)
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

  ngOnChanges(changes: SimpleChanges): void {
    this.handlErrors();
  }
}
