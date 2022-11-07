import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  SideMenu,
  Cancel,
  Menu,
  Main,
  Row,
  Left,
  Right,
  OutputText,
  OutputTextarea,
  ProfileImageWrapper,
  ProfileImage,
  Button,
} from "./profileCSS";

import { getMyInfo } from "../apis/user";
const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    user_name: "",
    memo: "",
  });
  const { profile_image, name, user_name, memo } = form;

  useEffect(() => {
    document.title = `My profile`;
  }, []);

  useEffect(() => {
    refreshInfo();
  }, []);

  const refreshInfo = async () => {
    const result = await getMyInfo();
    setForm(result.user);
  };

  useEffect(
    () => async () => {
      await getMyInfo();
    },
    []
  );

  return (
    <Container>
      <SideMenu>
        <article>
          <Link to="/">
            <Cancel>Cancel</Cancel>
          </Link>
          <Menu>Artist profile</Menu>
          <Link to="/profile/edit">
            <Button>Edit profile</Button>
          </Link>
        </article>
      </SideMenu>
      <Main>
        <ProfileImageWrapper>
          <ProfileImage src={profile_image} />
        </ProfileImageWrapper>
        <Row>
          <Left>Name</Left>
          <Right>
            <OutputText>{name}</OutputText>
          </Right>
        </Row>
        <Row>
          <Left>Username</Left>
          <Right>
            <OutputText>{user_name}</OutputText>
          </Right>
        </Row>
        <Row>
          <Left className="bio">Bio</Left>
          <Right>
            <OutputTextarea>{memo}</OutputTextarea>
          </Right>
        </Row>
      </Main>
    </Container>
  );
};

export default Profile;
