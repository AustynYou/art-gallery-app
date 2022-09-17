import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../apis/user.js";

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

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({});

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Signup Page`;
  }, []);

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
        <FirstBox>
          <Form onSubmit={handleSubmit}>
            <Legend>Sign up</Legend>
            <Aside>
              <LabelText htmlFor="name">Full name</LabelText>
              <InputText name="name" id="name" onChange={handleChange} />
            </Aside>
            <Aside>
              <LabelText htmlFor="username">Username</LabelText>
              <InputText
                id="username"
                value={form.user_name}
                name="user_name"
                onChange={handleChange}
              />
            </Aside>
            <Aside>
              <LabelText htmlFor="password">Password</LabelText>
              <InputText
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
              />
            </Aside>
            <Aside>
              <LabelText htmlFor="confirm">Confirm password</LabelText>
              <InputText
                id="confirm"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
              />
            </Aside>
            <BtnLogin>Sign up</BtnLogin>
          </Form>
        </FirstBox>
        <SecondBox>
          Have an account? <Link to="/login">Login</Link>
        </SecondBox>
      </Main>
    </Layout>
  );
};

export default SignUp;
