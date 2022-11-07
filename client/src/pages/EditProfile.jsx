import { useState, useEffect, useRef } from "react";
import {
  Container,
  SideMenu,
  Cancel,
  Menu,
  Main,
  Button,
  Row,
  Left,
  Right,
  ProfileImageWrapper,
  ProfileImage,
  BtnProfileImage,
  InputText,
  Textarea,
} from "./profileCSS";
import { useNavigate } from "react-router-dom";

import { getMyInfo, patchMyProfileImage, putMyInfo } from "../apis/user";
import { uploadImage } from "../apis/upload";

const EditProfile = () => {
  const fileEl = useRef(null);
  const [form, setForm] = useState({
    name: "",
    user_name: "",
    memo: "",
  });
  const { profile_image, name, user_name, memo } = form;

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Edit profile`;
  }, []);

  useEffect(() => {
    refreshInfo();
  }, []);

  const refreshInfo = async () => {
    const result = await getMyInfo();
    setForm(result.user);
    console.log(result.user);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const profile_image = await uploadImage(file);
    await patchMyProfileImage({ profile_image });
    refreshInfo();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    putMyInfo(form);
    alert("Successfully Edited!!");
    navigate(-1);
  };

  return (
    <Container>
      <SideMenu>
        <article>
          <Cancel onClick={() => navigate(-1)}>Cancel</Cancel>
          <Menu>Edit profile</Menu>
          <Button onClick={handleSubmit}>Done</Button>
        </article>
      </SideMenu>
      <Main>
        <ProfileImageWrapper>
          <ProfileImage src={profile_image} />
        </ProfileImageWrapper>
        <BtnProfileImage onClick={() => fileEl.current.click()}>
          Change profile photo
        </BtnProfileImage>
        <input
          ref={fileEl}
          type="file"
          style={{ display: "none" }}
          accept="/image/*"
          onChange={handleFileChange}
        />
        <Row>
          <Left>Name</Left>
          <Right>
            <InputText
              value={name}
              required
              name="name"
              onChange={handleChange}
            />
          </Right>
        </Row>
        <Row>
          <Left>Username</Left>
          <Right>
            <InputText
              value={user_name}
              required
              name="user_name"
              onChange={handleChange}
            />
          </Right>
        </Row>
        <Row>
          <Left className="bio">Bio</Left>
          <Right>
            <Textarea value={memo} name="memo" onChange={handleChange} />
          </Right>
        </Row>
        <Row>
          <Left></Left>
        </Row>
      </Main>
    </Container>
  );
};

export default EditProfile;
