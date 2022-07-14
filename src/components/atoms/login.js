import styled from "styled-components";

export const Layout = styled.div`
  background: #fafafa;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Main = styled.div`
  width: 350px;
`;
export const Box = styled.div`
  background: #fff;
  border: 1px solid #dbdbdb;
  padding: 10px 40px;
  margin-bottom: 10px;
`;

export const LogoWrapper = styled.div`
  text-align: center;
  margin: 36px 0;
`;
export const Logo = styled.img`
  margin: 0 auto;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
export const InputText = styled.input`
  height: 36px;
  background: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  padding-left: 8px;
  & + & {
    margin-top: 6px;
  }
`;
export const BtnLogin = styled.button`
  background: #0095f6;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 9px;
  font-weight: bold;
  margin-top: 16px;
  cursor: pointer;
`;

export const SecondBox = styled.div`
  padding: 15px 0;
  font-size: 14px;
  text-align: center;
  a {
    text-decoration: none;
    font-weight: bold;
    color: #0095f6;
  }
`;
