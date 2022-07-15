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
  return (
    <Layout>
      <Main>
        <Box>
          <LogoWrapper>
            <Logo src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" />
          </LogoWrapper>
          <Form>
            <InputText name="email" placeholder="Mobile Number or Email" />
            <InputText name="name" placeholder="Full name" />
            <InputText name="user_name" placeholder="Username" />
            <InputText name="password" placeholder="Password" type="password" />
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
