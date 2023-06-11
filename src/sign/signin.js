import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as SC from "./signSC";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post(
                "https://www.pre-onboarding-selection-task.shop/auth/signin",
                { email, password }
            )
            .then((res) => {
                localStorage.setItem("access_token", res.data.access_token);
                navigate('/todo')
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
            <h1>SignIn</h1>

            <SC.SignFrom onSubmit={submitHandler}>
                <SC.IdLine>
                    <span>icon</span>
                    <input
                        data-testid="email-input"
                        type="text"
                        placeholder="아이디"
                        name="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </SC.IdLine>
                <SC.PwLine>
                    <span>icon</span>
                    <input
                        data-testid="password-input"
                        type="password"
                        placeholder="비밀번호"
                        name="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </SC.PwLine>
                <button data-testid="signin-button" type="submit">
                    로그인
                </button>
            </SC.SignFrom>
        </SC.Container>
    );
};

export default Signin;
