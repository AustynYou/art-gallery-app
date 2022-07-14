import styled from "styled-components";
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

const LogIn = () => {
  return (
    <Layout>
      <Main>
        <Box>
          <LogoWrapper>
            <Logo src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" />
          </LogoWrapper>
          <Form>
            <InputText
              placeholder="Phone number, username, or email"
              required
            />
            <InputText placeholder="Password" type="password" required />
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
