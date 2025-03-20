import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useEmailInput from "./useEmailInput";
import usePasswordInput from "./usePasswordInput";
import useConfirmPasswordInput from "./useConfirmPasswordInput";
import useUsernameInput from "./useUsernameInput";

const useSignUp = () => {
  const navigate = useNavigate();
  const [validations, setValidations] = useState<SignUpValidation>({
    username: 0,
    emailForm: 0,
    emailUnique: 0,
    pwdCharSet: 0,
    pwdLength: 0,
    pwdSeriesOfSameChar: 0,
    confirmPassword: 0,
  });
  const email = useEmailInput(setValidations);
  const password = usePasswordInput(setValidations);
  const confirmPassword = useConfirmPasswordInput(
    password.value,
    setValidations,
  );
  const username = useUsernameInput(setValidations);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const newValidations = { ...validations };

      let isValid = true;
      let key: keyof SignUpValidation;
      for (key in newValidations) {
        if (newValidations[key] !== 1) {
          isValid = false;
        }
        if (newValidations[key] === 0) {
          if (key === "emailUnique") continue;
          newValidations[key] = -1;
        }
      }

      if (isValid) {
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, {
            email: email.value,
            password: password.value,
            username: username.value,
          });
          alert("회원가입에 성공했습니다.\n로그인해 주세요.");
          navigate("/");
        } catch (err) {
          alert("회원가입에 실패했습니다.");
        }
      } else {
        setValidations(newValidations);
      }
    },
    [validations],
  );

  return {
    email,
    password,
    confirmPassword,
    username,
    validations,
    handleSubmit,
  };
};

export default useSignUp;
