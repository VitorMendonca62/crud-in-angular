export const responseValidation = {
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
