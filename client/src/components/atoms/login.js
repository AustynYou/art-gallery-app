import styled from "styled-components";

export const Layout = styled.div`
  background: #fafafa;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.5vh;
  width: 425px;
  @media screen and (max-width: 500px) {
    width: 85%;
  }
`;
export const FirstBox = styled.div`
  background: #fff;
  border: 1px solid #dbdbdb;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 7% 10%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 420px) {
    row-gap: 1vh;
  }
  @media screen and (min-width: 421px) and (max-width: 767px) {
    row-gap: 2vh;
  }
  row-gap: 2vh;
`;

export const Legend = styled.legend`
  font-weight: 600;
  text-transform: uppercase;
  color: #ff647f;
  font-size: 24px;
`;

export const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  row-gap: 0.7vh;
  @media screen and (max-width: 420px) {
    row-gap: 0.3vh;
  }
  @media screen and (min-width: 421px) and (max-width: 767px) {
    row-gap: 0.5vh;
  }
`;

export const LabelText = styled.label`
  cursor: pointer;
  font-size: 14px;
  @media screen and (max-width: 389px) {
    font-size: 12px;
  }
`;
export const InputText = styled.input`
  height: 4.5vh;
  background: #fafafa;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  font-size: 14px;
  padding-left: 3%;

  @media screen and (max-width: 389px) {
    font-size: 12px;
    padding-left: 4%;
  }
`;

export const BtnLogin = styled.button`
  background-color: #ff647f;
  color: #fff;
  border: 1px solid #ff647f;
  box-shadow: 0px 5px 8px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  padding: 3%;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 14px;
`;

export const SecondBox = styled.div`
  background: #fff;
  border: 1px solid #dbdbdb;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 5%;
  text-align: center;
  font-size: 14px;
  a {
    font-weight: bold;
    color: #7a7a7a;
    text-transform: uppercase;
  }
  @media screen and (max-width: 389px) {
    font-size: 12px;
  }
`;
