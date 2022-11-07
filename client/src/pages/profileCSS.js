import styled from "styled-components";

export const Container = styled.div`
  background: #fff;
  width: 100%;
  @media screen and (max-width: 420px) {
    padding-top: 1.5%;
    margin-top: 0;
  }
  @media screen and (min-width: 421px) and (max-width: 767px) {
    margin-top: 0%;
    padding: 0;
  }
  @media screen and (min-width: 768px) {
    margin-top: -15px;
  }
`;
export const SideMenu = styled.div`
  /* border-right: 1px solid #ddd; */
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: center;
  height: 7vh;
  /* align-items: center; */

  article {
    width: 96%;
    border-right: none;
    display: flex;
    justify-content: space-between;
    a {
      color: #000;
      text-decoration: none;
    }
    @media screen and (min-width: 500px) {
      align-items: center;
    }
    @media screen and (min-width: 768px) and (max-width: 991px) {
      width: 100%;
      height: 55px;
    }
  }
`;

export const Cancel = styled.span`
  font-size: 14px;

  padding-right: 40px;

  @media screen and (max-width: 370px) {
    font-size: 12px;
    padding-right: 30px;
  }
`;
export const Menu = styled.div`
  font-weight: 600;
  font-size: 16px;

  @media screen and (max-width: 370px) {
    font-size: 14px;
  }
`;

export const Button = styled.button`
  background-color: transparent;
  color: #ff647f;
  border: 1px solid transparent;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  padding: 0;

  @media screen and (max-width: 370px) {
    font-size: 12px;
  }
  padding: 5px 9px;
  cursor: pointer;
`;

export const Main = styled.div`
  padding: 3% 10% 10% 10%;
  display: flex;
  flex-direction: column;
  row-gap: 3vh;
  align-items: center;
`;

export const ProfileImageWrapper = styled.figure`
  border-radius: 50%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media screen and (max-width: 767px) {
    width: 150px;
    height: 150px;
  }
  @media screen and (min-width: 768px) {
    width: 220px;
    height: 220px;
  }
`;

export const ProfileImage = styled.img`
  border-radius: 50%;
  align-self: center;
  width: fit-content;

  @media screen and (max-width: 767px) {
    height: 150px;
  }
  @media screen and (min-width: 768px) {
    height: 220px;
  }
`;

export const Row = styled.div`
  display: flex;
`;
export const Left = styled.div`
  font-weight: bold;
  margin-right: 30px;
  margin-top: 6px;
  text-align: right;
  align-self: center;
  font-family: sans-serif;
  width: 10vh;
  font-size: 16px;

  &.bio {
    align-self: auto;
    padding-top: 2%;
  }
  @media screen and (max-width: 389px) {
    font-size: 14px;
  }
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const OutputText = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  font-family: sans-serif;
  font-size: 14px;
  width: 290px;
  @media screen and (max-width: 389px) {
    font-size: 12px;
    width: 100%;
  }
`;
export const OutputTextarea = styled.div`
  resize: none;
  width: 92%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  font-family: sans-serif;
  height: 15vh;
  font-size: 14px;
  width: 270px;
  @media screen and (max-width: 389px) {
    font-size: 12px;
  }
`;

export const BtnProfileImage = styled.button`
  color: #ff647f;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 16px;

  @media screen and (max-width: 389px) {
    font-size: 12px;
  }
  @media screen and (min-width: 390px) and (max-width: 767px) {
    font-size: 14px;
  }
`;
export const InputText = styled.input`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 7px 10px;
  box-sizing: border-box;
  font-family: sans-serif;
  font-size: 14px;
  width: 290px;

  ::placeholder {
    font-family: sans-serif;
    font-size: 14px;
  }
  @media screen and (max-width: 389px) {
    font-size: 12px;

    ::placeholder {
      font-size: 12px;
    }
  }
`;
export const Textarea = styled.textarea`
  resize: none;
  height: 15vh;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
  padding: 6px 10px;
  font-family: sans-serif;
  width: 290px;

  ::placeholder {
    font-size: 14px;
    font-size: 14px;
  }

  ::placeholder {
    font-family: sans-serif;
  }

  @media screen and (max-width: 499px) {
    font-size: 12px;
    width: 150%;

    ::placeholder {
      font-size: 12px;
    }
  }
`;
