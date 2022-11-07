import { useState, useEffect } from "react";
import styled from "styled-components";
import { MainPostList } from "../components/organisms/index.js";
import { getPostsMain } from "../apis/post";

const Main = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
   document.title = `Main Page`;
  }, []);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = async () => {
    const { postList } = await getPostsMain();
    setPostList(postList);
  };

  return (
    <Container>
      <MainPostList postList={postList} />
    </Container>
  );
};

const Container = styled.div``;

export default Main;
