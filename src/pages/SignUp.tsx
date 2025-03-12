import axios from "axios";
import { useState } from "react";

const Signup = () => {
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [usernameValue, setUsernameValue] = useState("");
    const [error, setError] = useState("");

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
    };

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
    };

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsernameValue(e.target.value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailValue.length <= 0 || passwordValue.length <= 0) return;

        try {
            const res = await axios.post("http://localhost:8080/auth/signup", {
                email: emailValue,
                password: passwordValue,
                username: usernameValue,
            });

            console.log(res.data.username);
        } catch (err: any) {
            setError("일치하는 계정이 없습니다.");
        }
    };

    return (
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
            <input
                onChange={onUsernameChange}
                value={usernameValue}
                placeholder="Username"
            />
            <button type="submit">!로그인!</button>
            {error && <span>{error}</span>}
        </form>
    );
};

export default Signup;
