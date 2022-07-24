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
  Box,
  LogoWrapper,
  Logo,
  Form,
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
    navigate("/");
  };
  return (
    <Layout>
      <Main>
        <Box>
          <LogoWrapper>
            <Logo src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" />
          </LogoWrapper>
          <Form onSubmit={handleSubmit}>
            <InputText
              placeholder="Phone number, username, or email"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <InputText
              placeholder="Password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <BtnLogin>Login</BtnLogin>
          </Form>
          <GGLogin>Log in with Google</GGLogin>
          <ForgotPassword>Forget password?</ForgotPassword>
        </Box>
        <Box>
          <SecondBox>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </SecondBox>
        </Box>
      </Main>
    </Layout>
  );
};

const GGLogin = styled.div`
  color: #0095f6;
  font-weight: bold;
  font-size: 14px;
  margin-top: 30px;
  text-align: center;
`;
const ForgotPassword = styled.div`
  font-size: 12px;
  margin: 20px 0;
  text-align: center;
`;

export default LogIn;
