import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../apis/user.js";

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
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = {
      ...form,
      [name]: value,
    };
    setForm(newForm);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { user_name, password, confirmPassword } = form;
    if (user_name.length < 4)
      return alert("Your username must be at least 4 characters long.");
    if (password !== confirmPassword)
      return alert("password confirmation doesn't match password");

    const { success, message } = await createUser(form);
    if (success) {
      alert("Welcome");
      navigate("/login");
    } else {
      alert(message);
      setForm((prev) => ({ ...prev, user_name: "" }));
    }
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
              name="name"
              placeholder="Full name"
              onChange={handleChange}
            />
            <InputText
              value={form.user_name}
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
            <InputText
              name="confirmPassword"
              placeholder="Confirm password"
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
