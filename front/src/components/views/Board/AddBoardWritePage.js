import axios from "axios";
import React, { useState } from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

const AddBoardDivStyle = styled.div`
    height:315px;
    form{
      margin:auto;
      width:230px;
    }
    button{
      background-color:salmon;
      color:white;
      padding:5px;
    }
    input{
      height:35px;
    }
    input,button{
      vertical-align:middle
    }

`;
const AddBoardWritePage = ({ history }) => {
  const [menu, setMenu] = useState("");
  const writeMenu = (e) => {
    console.log(e.currentTarget.value);
    setMenu(e.currentTarget.value);
  };
  const OnSubmit = () => {
    //   alert(menu)
    if (menu == "") {
      alert("내용이 필요합니다.");
      return false;
    }
    axios.post("/addBoard/write", {
      aContent: menu,
    });
    history.push("/addBoard");
  };
  return (
    <AddBoardDivStyle className="AddBoardDivStyle">
      <form onSubmit={OnSubmit}>
        <input placeholder="메뉴이름을 작성해주세요" onChange={writeMenu} />
        <button>신청</button>
      </form>
    </AddBoardDivStyle>
  );
};

export default withRouter(AddBoardWritePage);
