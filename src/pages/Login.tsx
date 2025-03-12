import axios from "axios";
import React, { useState } from "react";

const Login = () => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [error, setError] = useState("");

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailValue.length <= 0 || passwordValue.length <= 0) return;

        try {
            const res = await axios.post("http://localhost:8080/auth/login", {
                email: emailValue,
                password: passwordValue,
            });

            console.log(res.data.username);
        } catch (err: any) {
            setError("일치하는 계정이 없습니다.");
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    onChange={onEmailChange}
                    value={emailValue}
                    placeholder="Email"
                />
                <input
                    onChange={onPasswordChange}
                    value={passwordValue}
                    placeholder="Password"
                />
                <button type="submit">!로그인!</button>
                {error && <span>{error}</span>}
            </form>
            <a href="http://localhost:8080/oauth2/authorization/google">
                Google로그인
            </a>
            <a href="http://localhost:8080/oauth2/authorization/naver">
                Naver로그인
            </a>
        </div>
    );
};

export default Login;
