import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import Quill from "quill";
import ReactQuill from 'react-quill';
// import "quill/dist/quill.bubble.css";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { withRouter } from "react-router";

const TitleInput = styled.input`
  font-size: 3rem;
  outline: none;
  /* padding-bottom: 0.5rem; */
  border: none;
  /* margin-bottom: 2rem; */
  width: 100%;
`;
const QuillWrapper = styled.div`
  margin: auto;
  height: 200px;
  .ql-editor {
    padding: 0;
    min-height: 180px;
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
  font-size: 1rem;
  font-weight: bold;
  padding: 0.3rem 1rem;
  outline: none;
  cursor: pointer;
  height: 30px;
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
  /* border: 1px solid rgb(185, 185, 185); */
  margin: auto;
  width: 700px;
  height: 300px;
  .FreeBoardForm{
    height:300px;
  }
`;

const FreeBoardWritePage = ({ title, body, history }) => {
  //quill을 적용할 Div엘리먼트 설정
  const quillElement = useRef(null);
  //quill 인스턴스설정
  const quillInstance = useRef(null);

  const [fTitle, setFTitle] = useState("");
  const [fContent, setFContent] = useState("");

  useEffect(() => {
    console.log(fTitle, fContent);
    quillInstance.current = new Quill(quillElement.current, {
      // theme: "bubble",
      theme: "snow",
      placeholder: "내용을 입력하시오(모바일은 이미지 업로드 불가..)",
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
      setFContent(quill.root.innerHTML);
    });
  }, []);

  const onChangeTitle = (e) => {
    console.log("title", e.currentTarget.value);
    setFTitle(e.currentTarget.value);
    console.log(fTitle);
  };

  const BoardSubmit = async (e) => {
    if (fTitle !== "" && fContent !== "") {
      try {
        axios.post("/freeBoard/write", {
          fTitle: fTitle,
          fContent: fContent,
        });
        history.push("/freeBoard");
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("제목이나 내용을 입력하시오");
      return false;
    }
  };

  return (
    <div className="FreeBoardWriteOutDiv">
      <OutFormDiv className="FreewriteDiv">
        <form onSubmit={BoardSubmit} className="FreeBoardForm">
          <TitleInput
            className="TitleIput"
            placeholder="제목을 입력하시오"
            onChange={onChangeTitle}
            value={title}
          />
          <hr />
          <QuillWrapper>
            <div ref={quillElement} />
          </QuillWrapper>
          <StyledButton className="WriteButtonDiv">작성</StyledButton>
        </form>
      </OutFormDiv>
    </div>
  );
};

export default withRouter(FreeBoardWritePage);
