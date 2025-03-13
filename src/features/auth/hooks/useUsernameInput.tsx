import { useCallback, useState } from "react";

const useUsernameInput = (
  setValidations: React.Dispatch<React.SetStateAction<SignUpValidation>>,
) => {
  const [value, setValue] = useState("");

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const isValid = input.length > 12 || input.length < 2 ? -1 : 1;

    setValue(input);
    setValidations((prev) => ({ ...prev, username: isValid }));
  }, []);

  return { value, onChange };
};

export default useUsernameInput;
