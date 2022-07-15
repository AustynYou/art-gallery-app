import { useState } from "react";
import { createUser } from "../../apis/user.js";
import { Link } from "react-router-dom";
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

const SignUp = () => {
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = {
      ...form,
      [name]: value,
    };
    setForm(newForm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(form);
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
              name="email"
              placeholder="Mobile Number or Email"
              onChange={handleChange}
            />
            <InputText
              name="name"
              placeholder="Full name"
              onChange={handleChange}
            />
            <InputText
              name="user_name"
              placeholder="Username"
              onChange={handleChange}
            />
            <InputText
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
            />
            <BtnLogin>Sign up</BtnLogin>
          </Form>
        </Box>
        <Box>
          <SecondBox>
            Have an account? <Link to="/login">Log in</Link>
          </SecondBox>
        </Box>
      </Main>
    </Layout>
  );
};

export default SignUp;
