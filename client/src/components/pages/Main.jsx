import { useState, useEffect } from "react";
import styled from "styled-components";
import { MainPostList } from "../organisms/index.js";
import { getPostsMain } from "../../apis/post";

const Main = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Main Page`;
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
      <MainPostList data={postList} />
    </Container>
  );
};

const Container = styled.div``;

export default Main;
