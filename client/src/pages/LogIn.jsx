import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../apis/user";
import { useSetRecoilState } from "recoil";
import { loginState } from "../stores";

import instance from "../apis";
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
} from "../components/atoms/login";

const LogIn = () => {
  const setIsLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.title = `Login Page`;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Blocking default action such as page moving when the form is submitted.

    // getToken API (1) pass login info such as user_name and password to the server
    // and it (2)returns success, message, user's token received from the server when user logged in
    const { success, message, token } = await getToken({
      user_name: userName,
      password,
    });
    // Early return
    if (!success) return alert(message); // Password is incorrect

    // Authorization: Gives users permission to access a resource
    // Change the header setting then the request will be made with the reflected header information
    // Set the authorization token to header for all axios requests that require it.
    instance.defaults.headers.common["Authorization"] = token;

    // Store token in browser localStorage to keep user logged in after page refresh
    // Now even if the session (process, tab, browser) is terminated, the token will still be not deleted.
    // And then when calling any API that requires authorization, user is authorizated with the token in the header.
    // set the token to localStorage
    localStorage.token = token; // this will be managed by Recoil which is a state management library
    setIsLogin(true);
    alert("Now you can post your works to Art Gallery App!!");
    navigate("/");// If login is successful, it will be navigated to the main page.
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
                autoComplete="off"
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
