import { useCallback, useState } from "react";
import axios from "axios";
import debounce from "utils/debounce";

const useEmailInput = (
  setValidations: React.Dispatch<React.SetStateAction<SignUpValidation>>,
) => {
  const [value, setValue] = useState("");

  const emailCheck = useCallback(async (email: string) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup/available`,
        { email: email },
      );
      setValidations((prev) => ({ ...prev, emailUnique: 1 }));
    } catch (err: any) {
      setValidations((prev) => ({ ...prev, emailUnique: -1 }));
    }
  }, []);

  const debounceEmailCheck = useCallback(debounce(emailCheck, 300), []);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const emailForm = input.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g) ? 1 : -1;

    debounceEmailCheck(input);

    setValue(input);
    setValidations((prev) => ({
      ...prev,
      emailForm: emailForm,
      emailUnique: 0,
    }));
  }, []);

  return { value, onChange };
};

export default useEmailInput;
