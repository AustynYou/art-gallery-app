import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Backdrop, ModalContainer } from "../../atoms/modal";

import { getPostsMain } from "../../../apis/post";
import { postPosts } from "../../../apis/post";
import { uploadImage } from "../../../apis/upload";

import { ReactComponent as IconMedia } from "../../../assets/images/media.svg";

const ModalEditPost = ({ onClose }) => {
  const fileEl = useRef(null);
  const [imageList, setImageList] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `New Post`;
  }, []);

  useEffect(() => {
    refreshList();
  }, []);

  const refreshList = async () => {
    const { postList } = await getPostsMain();
    console.log(postList);
  };

  const handleClick = () => {
    fileEl.current.click();
  };

  const handleFileChange = (e) => {
    // console.log(e.target.files[0]);
    const { files } = e.target;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        // console.log(reader.result);
        setImageList((prev) => [...prev, { preview: reader.result, file }]);
        setIsSelected(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const promiseList = imageList.map(({ file }) => uploadImage(file));
    // uploadImage(fileList[0]),
    // uploadImage(fileList[1]),
    // uploadImage(fileList[2]),

    const fileList = await Promise.all(promiseList);

    postPosts({ fileList, content });
  };

  const handleContentChange = (e) => setContent(e.target.value);

  return (
    <>
      <Backdrop onClick={onClose} />
      <Container>
        <Header>
          <GoBack onClick={onClose}>&#x2190;</GoBack>
          Edit post
          <BtnSubmit onClick={handleSubmit}>Share</BtnSubmit>
        </Header>
        {imageList.map(({ preview }) => (
          <img src={preview} key={preview} />
        ))}
        <Main>
          {!isSelected && <IconMedia />}

          <Guide>Choose File</Guide>
          <Button onClick={handleClick}> Select from your device</Button>
          <InputFile
            ref={fileEl}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
          />
          <Textarea
            placeholder="desription..."
            onChange={handleContentChange}
            value={content}
          />
        </Main>
      </Container>
    </>
  );
};

const Container = styled(ModalContainer)`
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: 90vh;
  width: 574px;

  img {
    margin-bottom: 1.5%;
  }
  @media screen and (max-width: 767px) {
    width: 85%;
  }
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 60%;
  }
`;

const GoBack = styled.div`
  padding-right: 12%;
  font-size: 20px;
  cursor: pointer;
  @media screen and (max-width: 420px) {
    font-size: 16px;
  }
`;

const Header = styled.div`
  font-weight: bold;
  border-bottom: 1px solid #dbdbdb;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3%;
  margin-bottom: 10%;
  column-gap: 1vh;
  @media screen and (max-width: 420px) {
    font-size: 14px;
  }

  @media screen and (min-width: 421px) and (max-width: 767px) {
    font-size: 16px;
  }
  @media screen and (min-width: 768px) {
    padding: 2%;
    font-size: 18px;
  }
`;

const BtnSubmit = styled.button`
  font-weight: 600;
  background-color: transparent;
  border-radius: 4px;
  color: #ff647f;
  border: none;
  padding: 5px 9px;
  cursor: pointer;
  @media screen and (max-width: 420px) {
    font-size: 12px;
  }
  @media screen and (min-width: 421px) and (max-width: 767px) {
    font-size: 14px;
  }
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`;
const Main = styled.div`
  padding: 0 0 20% 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 767px) {
    row-gap: 2vh;
  }
  @media screen and (min-width: 768px) {
    row-gap: 1vh;
  }
`;
const Guide = styled.h3`
  margin: 0;
  padding: 0;
`;
const Button = styled.button`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  border-radius: 4px;
  background-color: #ff647f;
  border: none;
  cursor: pointer;
  @media screen and (max-width: 420px) {
    padding: 3%;
    width: 60vw;
    font-size: 12px;
  }
  @media screen and (min-width: 421px) and (max-width: 767px) {
    width: 40vw;
    padding: 2%;
  }
  @media screen and (min-width: 768px) and (max-width: 1199px) {
    width: 26vw;
    padding: 2%;
    font-size: 16px;
  }
  @media screen and (min-width: 1200px) {
    width: 290px;
    padding: 2%;
    font-size: 16px;
  }
`;
const InputFile = styled.input`
  display: none;
`;
const Textarea = styled.textarea`
  resize: none;
  border-radius: 4px;
  min-height: 14vh;
  padding: 2%;
  font-family: sans-serif;
  ::placeholder {
    font-size: 12px;
    font-family: sans-serif;
  }
  @media screen and (max-width: 420px) {
    min-height: 10vh;
    width: 60vw;
    font-size: 12px;
    ::placeholder {
      font-size: 12px;
    }
  }
  @media screen and (min-width: 421px) and (max-width: 767px) {
    width: 40vw;
    font-size: 16px;
    ::placeholder {
      font-size: 16px;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1199px) {
    width: 26vw;
    min-height: 14vh;
    padding: 2%;
    font-size: 16px;

    ::placeholder {
      font-size: 16px;
    }
  }
  @media screen and (min-width: 992px) {
    min-height: 14vh;
    width: 26vw;
    padding: 2%;
    font-size: 16px;

    ::placeholder {
      font-size: 16px;
    }
  }
  @media screen and (min-width: 1200px) {
    width: 290px;
  }
`;
export default ModalEditPost;
