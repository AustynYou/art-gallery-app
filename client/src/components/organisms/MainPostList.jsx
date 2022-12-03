import styled from "styled-components";
import MainPostImageList from "./MainPostImageList";
import moment from "moment";
import "moment/locale/en-ca";

import { useState, useEffect } from "react";

import { ModalEditPost } from "./modals";
import { deletePosts } from "../../apis/post"

const MainPostList = ({ postList }) => {
  const [open, setOpen] = useState(false);
  const [showModalEditPost, setShowModalEditPost] = useState(false);
  const [postIdx, setPostIdx] = useState(-1);

  const setTime = (e) => {
    return moment(e).format(`llll`);
  };

  // useEffect(()=>{
  //   console.log(postIdx);
  //   setPostIdx(postIdx)
  // }, [postIdx])

  const goEdit = (id) => (e) => {
    console.log(id);
    // setPostIdx(id)
    setOpen(!open);
    let thisDropdownMenu = e.target.parentElement;
    if (!open) {
      thisDropdownMenu.style.display = "flex";
    } else {
      thisDropdownMenu.style.display = "none";
    }

    let posts = document.querySelectorAll("div > article");
    let thisPost =
      e.target.parentElement.parentElement.parentElement.parentElement;
    for (let idx = 0; idx < posts.length; idx++) {
      if (posts[idx] === thisPost) {
        setPostIdx(idx);
      }
    }
    setShowModalEditPost(true);
  };

  const handleEllipsis = (e)=>{
    setOpen(!open);

    let thisDropdownMenu = e.target.nextElementSibling;
    if (!open) {
      thisDropdownMenu.style.display = "flex";
    } else {
      thisDropdownMenu.style.display = "none";
    }
  }

  const handleClickDelete = (e)=> {
    // console.log(id);
    // alert("Are you sure to delete this post?")
    let thisPost = e.target.parentElement.parentElement.parentElement.parentElement;
    thisPost.remove();
    // await deleteMyPosts(id);
  }

  return (
    <>
      <List>
        {postList &&
          postList.map(
            ({
              id,
              name,
              imageList,
              profile_image,
              content,
              created_at,
              user_id,
            }) => (
              <Post key={id}>
                <Header>
                  <article>
                    <ProfileImageWrapper>
                      <ProfileImage src={profile_image} />
                    </ProfileImageWrapper>
                    <HeaderName>{name}</HeaderName>
                  </article>
                  <NavItem className={id}>
                    <EllipsisIcon
                      src={require("../../icon/ellipsis.png")}
                      onClick={handleEllipsis}
                    />
                    <DropdownMenu>
                      <DropdownItem onClick={goEdit(id)}>Edit</DropdownItem>
                      <DropdownItem onClick={handleClickDelete}>Delete</DropdownItem>
                    </DropdownMenu>
                  </NavItem>
                </Header>
                <MainPostImageList data={imageList} />
                <Content>
                  <ContentName>{name}</ContentName>
                  <UserContent>{content}</UserContent>
                </Content>
                <MetaData>{setTime(created_at)}</MetaData>
              </Post>
            )
          )}
        {showModalEditPost && (
          <ModalEditPost
            postList={postList}
            idx={postIdx}
            onClose={() => setShowModalEditPost(false)}
          />
        )}
      </List>
    </>
  );
};

const EllipsisIcon = styled.img`
  width: 20px;
`;

const NavItem = styled.div`
  position: relative;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 250%;
  left: -400%;
  z-index: 1000;
  width: 20vh;
  /* display: flex; */
  flex-direction: column;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 0;
  border: 1px solid #dbdbdb;
  border-radius: 7px;
  display: none;
`;
const DropdownItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5% 0;
  width: 100%;
  cursor: pointer;
  &:first-child {
    border-bottom: 1px solid #dbdbdb;
  }
  &:last-child {
    color: red;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 390px) {
    row-gap: 0.3vh;
  }
  @media screen and (min-width: 391px) and (max-width: 767px) {
    flex-direction: column;
    row-gap: 1vh;
  }
  @media screen and (min-width: 768px) {
    row-gap: 2vh;
  }
`;

const Post = styled.article`
  border: 1px solid #dbdbdb;
  @media screen and (max-width: 767px) {
    border: 1px solid #dbdbdb;
    border: none;
  }
  width: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
`;
const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    padding: 0 2.6%;
    height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 2% 2.5%;
  }

  article {
    display: flex;
    align-items: center;
    @media screen and (max-width: 767px) {
      column-gap: 1.5vh;
    }
    @media screen and (min-width: 768px) {
      column-gap: 1.2vh;
    }
  }

  .icon {
    padding-right: 10px;
    cursor: pointer;
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
  width: 30px;
  height: 30px;
  @media screen and (min-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: fit-content;
  height: 30px;
  @media screen and (min-width: 768px) {
    height: 35px;
  }
`;

const HeaderName = styled.span`
  color: #262626;
  font-size: 14px;
  font-weight: 600;
`;

const Content = styled.div`
  padding: 0 16px;
  font-size: 14px;
  margin-bottom: 4px;
  text-align: justify;
  @media screen and (max-width: 767px) {
    padding: 3% 2.6% 0 2.6%;
    column-gap: 1vh;
  }
  @media screen and (min-width: 768px) {
    padding: 2% 3% 0 3%;
    column-gap: 1vh;
  }
`;

const ContentName = styled.span`
  color: #262626;
  font-size: 14px;
  font-weight: 600;
  padding-right: 7px;
`;

const UserContent = styled.span`
  color: #262626;
  font-size: 14px;
`;

const MetaData = styled.time`
  color: #8e8e8e;
  font-size: 10px;
  margin-bottom: 16px;
  line-height: 18px;
  padding: 0 16px;
  @media screen and (max-width: 767px) {
    font-size: 12px;
    padding: 0 0 3% 2.6%;
  }
  @media screen and (min-width: 768px) {
    font-size: 12px;
    padding: 0 0 1% 3%;
  }
`;

export default MainPostList;
