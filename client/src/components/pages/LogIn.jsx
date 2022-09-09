import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getToken } from "../../apis/user";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../stores/index";

import instance from "../../apis";
import {
  Layout,
  Main,
  FirstBox,
  Legend,
  Form,
  Aside,
  LabelText,
  InputText,
  BtnLogin,
  SecondBox,
} from "../atoms/login";

const LogIn = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message, token } = await getToken({
      user_name: userName,
      password,
    });
    if (!success) return alert(message);

    instance.defaults.headers.common["Authorization"] = token;
    localStorage.token = token;
    setIsLogin(true);
    alert("Now you can post your works to Art Gallery App!!");
    navigate("/");
  };
  return (
    <Layout>
      <Main>
        <FirstBox>
          <Form onSubmit={handleSubmit}>
            <Legend>Login</Legend>
            <Aside>
              <LabelText htmlFor="username">Username</LabelText>
              <InputText
                id="username"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
            </Aside>
            <Aside>
              <LabelText htmlfor="password">Password</LabelText>
              <InputText
                id="password"
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Aside>
            <BtnLogin>Login</BtnLogin>
          </Form>
        </FirstBox>
        <SecondBox>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </SecondBox>
      </Main>
    </Layout>
  );
};

export default LogIn;
