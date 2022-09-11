import { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, Link } from "react-router-dom";
import { ModalAddPost } from "./modals";

import { getMyInfo } from "../../apis/user";

import { faHouse, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PageHeader = ({ data }) => {
  const [showModalAddPost, setShowModalAddPost] = useState(false);
  const [profile, setProfile] = useState({});
  const { profile_image } = profile;

  useEffect(() => {
    refreshInfo();
  }, []);

  const refreshInfo = async () => {
    const result = await getMyInfo();
    setProfile(result.user);
  };

  useEffect(
    () => async () => {
      await getMyInfo();
    },
    []
  );

  return (
    <Body>
      <Header>
        <Main>
          <Link to="/">
            <ImgLogo src={require("../../assets/images/logo.png")} />
          </Link>
          <Nav>
            <IconWrapper>
              <FontAwesomeIcon icon={faHouse} className="icon" />
            </IconWrapper>
            <IconWrapper onClick={() => setShowModalAddPost(true)}>
              <FontAwesomeIcon icon={faEdit} className="icon" />
            </IconWrapper>
            <IconWrapper>
              <Link to="/profile">
                <ProfileImageWrapper>
                  <ProfileImage src={profile_image} />
                </ProfileImageWrapper>
              </Link>
            </IconWrapper>
          </Nav>
        </Main>
      </Header>
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      {showModalAddPost && (
        <ModalAddPost onClose={() => setShowModalAddPost(false)} />
      )}
    </Body>
  );
};

const Body = styled.main`
  display: flex;
  justify-content: center;
`;

const Header = styled.header`
  background: #fff;
  border-bottom: #dbdbdb;
  box-shadow: 0 5px 8px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
`;

const Main = styled.article`
  display: flex;
  align-items: center;
  height: 8vh;
  justify-content: space-between;
  width: 615px;

  @media screen and (max-width: 767px) {
    justify-content: space-between;
    width: 97%;
  }

  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 65%;
  }
`;
const ImgLogo = styled.img`
  @media (max-width: 370px) {
    width: 130px;
  }
  @media screen and (min-width: 371px) and (max-width: 420px) {
    width: 150px;
  }

  @media screen and (min-width: 421px) {
    width: 170px;
  }
  @media screen and (min-width: 768px) {
    width: 190px;
  }
`;

const Nav = styled.ul`
  display: flex;
  align-items: center;
  @media screen and (max-width: 420px) {
    column-gap: 2vh;
    padding: 0;
    margin: 0;
  }
  @media screen and (min-width: 421px) and (max-width: 767px) {
    column-gap: 3vh;
  }
  @media screen and (min-width: 768px) {
    column-gap: 4vh;
  }
`;

const IconWrapper = styled.li`
  display: flex;
  @media screen and (max-width: 420px) {
    width: 100%;
  }
  cursor: pointer;
  .icon {
    font-size: 20px;
    transition: all 0.3s;
    color: #555;
    &:hover {
      color: #ff647f;
    }
    @media screen and (max-width: 389px) {
      font-size: 16px;
    }
    @media screen and (min-width: 390px) and (max-width: 420px) {
      font-size: 22px;
    }
    @media screen and (min-width: 421px) and (max-width: 991px) {
      font-size: 24px;
    }
    @media screen and (min-width: 992px) {
      font-size: 26px;
    }
  }
`;

const ProfileImageWrapper = styled.figure`
  border-radius: 50%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 0;

  @media screen and (max-width: 389px) {
    width: 22px;
    height: 22px;
  }
  @media screen and (min-width: 390px) and (max-width: 991px) {
    width: 30px;
    height: 30px;
  }
  @media screen and (min-width: 992px) {
    width: 34px;
    height: 34px;
  }
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: fit-content;
  @media screen and (max-width: 389px) {
    height: 22px;
  }
  @media screen and (min-width: 390px) and (max-width: 991px) {
    height: 30px;
  }
  @media screen and (min-width: 992px) {
    height: 34px;
  }
`;

const OutletWrapper = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 15%;
  width: 100%;
  @media screen and (min-width: 421px) and (max-width: 767px) {
    margin-top: 8vh;
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 65%;
    margin-top: 80px;
  }
  @media screen and (min-width: 992px) {
    width: 620px;
    margin-top: 80px;
  }
`;

export default PageHeader;
