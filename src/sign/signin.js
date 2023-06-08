import React, { useState } from "react";
import axios from "axios";
import * as SC from "./signSC";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    const checkedEmail = (e) => {
        const curEmail = e.target.value;
        if (curEmail.includes("@")) {
            setEmail(curEmail);
            setIsEmail(true);
        } else {
            setEmail("");
            setIsEmail(false);
        }
    };

    const checkedPassword = (e) => {
        const curPassword = e.target.value;
        if (curPassword.length >= 8) {
            setPassword(curPassword);
            setIsPassword(true);
        } else {
            setPassword("");
            setIsPassword(false);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/auth/signup", { email, password })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <SC.Container>
            <h1>SignIn</h1>

            <SC.SignFrom onSubmit={submitHandler}>
                <SC.IdLine>
                    <span>icon</span>
                    <input
                        data-testid="email-input"
                        type="text"
                        placeholder="아이디"
                        name="email"
                        onChange={checkedEmail}
                    />
                </SC.IdLine>
                <SC.PwLine>
                    <span>icon</span>
                    <input
                        data-testid="password-input"
                        type="password"
                        placeholder="비밀번호"
                        name="password"
                        onChange={checkedPassword}
                    />
                </SC.PwLine>
                <button
                    data-testid="signup-button"
                    type="submit"
                    disabled={isEmail && isPassword ? false : true}>
                    로그인
                </button>
            </SC.SignFrom>
        </SC.Container>
    );
};

export default Signin;
