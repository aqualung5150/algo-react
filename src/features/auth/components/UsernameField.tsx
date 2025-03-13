import CloseSVG from "assets/fail-signup.svg?react";
import React from "react";

const UsernameField = ({ input, validations }: SignUpFieldProps) => {
  return (
    <div className="w-80">
      <label className="m-1 block" htmlFor="nickname">
        Username
      </label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        className={`h-14 w-full rounded border p-4 shadow focus:outline-none ${validations.username === -1 && "border-red-500"}`}
        {...input}
      />
      {validations.username === -1 && (
        <div className="m-1 flex items-center gap-1 stroke-red-500 text-sm text-red-500">
          <CloseSVG className="h-4 w-4" />
          <p>최소 2자~12자 이하로 입력해 주세요.</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(UsernameField);
