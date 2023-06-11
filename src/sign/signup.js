import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as SC from "./signSC";

const Singup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    const navigate = useNavigate();

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
            .post(
                "https://www.pre-onboarding-selection-task.shop/auth/signup",
                { email, password }
            )
            .then(() => {
                navigate("/signin");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate("/todo");
        }
    }, []);

    return (
        <SC.Container>
            <h1>SignUp</h1>

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
                    회원가입
                </button>
            </SC.SignFrom>
        </SC.Container>
    );
};

export default Singup;
