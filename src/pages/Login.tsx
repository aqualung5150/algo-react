import axios from "axios";
import React, { useState } from "react";
import GoogleSVG from "assets/google-login.svg?react";
import NaverLogin from "assets/naver-login.png";
import { Link } from "react-router";
import useFormInput from "hooks/useFormInput";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const { inputProps: email } = useFormInput("");
  const { inputProps: password } = useFormInput("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (emailValue.length <= 0 || passwordValue.length <= 0) return;
    if (email.value.length <= 0 || password.value.length <= 0) return;

    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        email: email.value,
        password: password.value,
      });

      console.log(res.data.username);
    } catch (err: any) {
      setError("일치하는 계정이 없습니다.");
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 lg:gap-10">
      <form
        onSubmit={handleSubmit}
        className="flex h-[400px] w-[500px] flex-col items-center justify-center gap-5"
      >
        <div className="text-2xl">로그인</div>
        <div className="flex justify-center gap-2">
          <div className="flex flex-col gap-2">
            <input
              // type="email // -> 'admin'으로 로그인하려 하면 브라우저에서 계속 email형식 검사함.
              className={`h-12 w-56 rounded border p-2 outline-none ${error && "border-red-500"}`}
              {...email}
              placeholder="Email"
            />
            <input
              type="password"
              className={`h-12 w-56 rounded border p-2 outline-none ${error && "border-red-500"}`}
              {...password}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="h-full w-20 rounded bg-blue-500 text-white"
          >
            로그인
          </button>
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
        <div className="flex gap-5">
          <a href="http://localhost:8080/oauth2/authorization/google">
            <GoogleSVG className="h-14 w-14" />
          </a>
          <a href="http://localhost:8080/oauth2/authorization/naver">
            <img src={NaverLogin} className="h-14 w-14" />
          </a>
        </div>

        <Link to="/signup" className="text-sm text-blue-500">
          회원가입
        </Link>
      </form>
    </div>
  );
};

export default Login;
