import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import Quill from "quill";
// import "quill/dist/quill.bubble.css";
import 'react-quill/dist/quill.snow.css';
import { withRouter } from "react-router";

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  /* padding-bottom: 0.5rem; */
  border: none;
  /* margin-bottom: 2rem; */
  width: 100%;
`;
const TitleStyled = styled.div`
  font-family: "Jua", sans-serif;
  text-align: center;
  font-size: 50px;
  margin: 0 0 15px 0;
`;

const QuillWrapper = styled.div`
  margin: auto;
  height: 600px;
  .ql-editor {
    padding: 0;
    /* min-height: 320px; */
    font-size: 1.2rem;
    line-height: 1.5;
  }
  .ql-editor.ql-blank::before {
    left: 0;
  }
`;

const buttonStyle = css`
background-color:salmon;
color: white;
  width: 698px;
  border: 1px solid rgb(185, 185, 185);
  border-radius: 4px;
  font-size: 2rem;
  font-weight: bold;
  padding: 0.3rem 1rem;
  /* color: black; */
  outline: none;
  cursor: pointer;
  height: 85px;
  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.8rem;
      padding-bottom: 0.8rem;
      width: 100%;
      font-size: 1.2rem;
    `}
  ${(props) =>
    props.cyan &&
    css`
      &:hover {
        background: #000000;
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;
const OutFormDiv = styled.div`
  margin: auto;
  width: 700px;
`;

const FreeBoardUpdatePage = ({ match, history }) => {
  const fNo = match.params.fno;
  const quillElement = useRef(null);
  //quill 인스턴스설정
  const quillInstance = useRef(null);

  const [lists, setLists] = useState([
    {
      fNo: "",
      fTitle: "",
      fUserid: "",
      fContent: "",
      fDate: "",
      fLike: "",
      fView: "",
    },
  ]);

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  useEffect(async () => {
    const res = await axios.get(`/freeBoard/get/${fNo}`);
    console.log("res.data==>", res.data.freeboard[0]);
    const data = res.data.freeboard[0];
    setLists(data);
  }, []);

  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      // theme: "bubble",
      theme: "snow",
      // value:`${lists.fContent}`,
      // placeholder: `${lists.fContent}`,
      placeholder: "내용을 입력하시오.(모바일은 이미지 업로드 불가..)",
      modules: {
        toolbar: [
          //[{ 'font': [] }],
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike',],
          ['link', 'image'],
          [{ 'align': [] }, { 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        ],
      },
      formats : [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',        
      ]
    });

    const quill = quillInstance.current;
    quill.on("text-change", (delta, oldDelta, source) => {
      console.log("quill.root.innerHTML ==>", quill.root.innerHTML);
      setUpdateContent(quill.root.innerHTML);
    });
  }, []);

  const UpdateSubmit = () => {
    // alert('updateContent'+updateContent+'updateTitle ==> '+updateTitle)
    if (updateContent !== "" && updateTitle !== "") {
      axios.put(`/freeBoard/update/${fNo}`, {
        fTitle: updateTitle,
        fContent: updateContent,
      });
      history.push(`/freeBoard`);
      // history.push(`/freeBoard/${fNo}`)
    } else {
      alert("제목이나 내용을 입력해주세요");
      return false;
    }
  };

  const onChangeTitle = (e) => {
    console.log(e.currentTarget.value);
    setUpdateTitle(e.currentTarget.value);
  };
  const GoListMenu = () =>{
    history.push(`/freeBoard`);
  }

  return (
    <div>
      <OutFormDiv className="UpdatePageDiv">
        <form onSubmit={UpdateSubmit} className="FreeBoardUpdateForm">
          <TitleInput
          className="UpdateTitleInput"
            onChange={onChangeTitle}
            placeholder="제목을 입력하시오"
          />
          <QuillWrapper>
            <div ref={quillElement} />
          </QuillWrapper>
          <StyledButton className="updateButton">수정</StyledButton>
        </form>
        <StyledButton className="updateButton" onClick={GoListMenu}>목록</StyledButton>
      </OutFormDiv>
    </div>
  );
};

export default withRouter(FreeBoardUpdatePage);
