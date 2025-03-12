interface SignUpFieldProps {
  input: InputProps;
  validations: SignUpValidation;
}

interface SignUpValidation {
  nickname: number;
  emailForm: number;
  emailUnique: number;
  pwdCharSet: number;
  pwdLength: number;
  pwdSeriesOfSameChar: number;
  confirmPassword: number;
}
