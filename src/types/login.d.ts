interface SignUpFieldProps {
  input: InputProps;
  validations: SignUpValidation;
}

interface SignUpValidation {
  username: number;
  emailForm: number;
  emailUnique: number;
  pwdCharSet: number;
  pwdLength: number;
  pwdSeriesOfSameChar: number;
  confirmPassword: number;
}
