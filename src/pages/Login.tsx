import axios from "axios";
import React, { useState } from "react";
import GoogleSVG from "assets/google-login.svg?react";
import NaverLogin from "assets/naver-login.png";
import { Link, useNavigate } from "react-router";
import useFormInput from "hooks/useFormInput";
import { useDispatch } from "react-redux";
import { axiosInstance } from "data/axiosInstance";
import { setUser } from "features/member/memberSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inputProps: email } = useFormInput("");
  const { inputProps: password } = useFormInput("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.value.length <= 0 || password.value.length <= 0) return;

    try {
      const loginResponse = await axiosInstance.post("login", {
        email: email.value,
        password: password.value,
      });

      const profileResponse = await axiosInstance.get("members/me");
      dispatch(setUser(profileResponse.data));
      setError("");
      navigate(loginResponse.data.redirectUrl);
    } catch (err: any) {
      setError("일치하는 계정이 없습니다.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-full w-full flex-col items-center justify-center gap-5 lg:gap-10"
    >
      <div className="text-2xl">로그인</div>
      <div className="flex justify-center gap-2">
        <div className="flex flex-col gap-2">
          <input
            // type="email // -> 'admin'으로 로그인하려 하면 브라우저에서 계속 email형식 검사함.
            className={`h-12 w-56 rounded-xs border p-2 outline-none ${error && "border-red-500"}`}
            {...email}
            placeholder="Email"
          />
          <input
            type="password"
            className={`h-12 w-56 rounded-xs border p-2 outline-none ${error && "border-red-500"}`}
            {...password}
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="h-full w-20 cursor-pointer rounded-xs border border-blue-500 text-blue-500"
        >
          로그인
        </button>
      </div>
      {error && <span className="text-sm text-red-500">{error}</span>}
      <div className="flex gap-5">
        <a href={`${import.meta.env.VITE_API_URL}/oauth2/authorization/google`}>
          <GoogleSVG className="h-14 w-14" />
        </a>
        <a href={`${import.meta.env.VITE_API_URL}/oauth2/authorization/naver`}>
          <img src={NaverLogin} className="h-14 w-14" />
        </a>
      </div>

      <Link to="/signup" className="text-sm text-blue-500">
        회원가입
      </Link>
    </form>
  );
};

export default Login;
