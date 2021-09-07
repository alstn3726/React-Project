import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getAddBoardList } from "../../../_actions/board_action";

const AddBoardBtn = styled.div`
  a{
    width:300px;
  }
`;

const AddListBoardPage = () => {

  
  const [lists, setLists] = useState([
    {
      aNo: "",
      aUserid: "",
      aContent: "",
      aDate: "",
    },
  ]);
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      // dispatch(getAddBoardList());
      const res = await axios.get("/addBoard");
      console.log("추가게시판!!", res.data);
      const inputdata = await res.data.addboard.map((data) => ({
        aNo: data.aNo,
        aUserid: data.aUserid,
        aContent: data.aContent,
        aDate: data.aDate,
      }));
      setLists(lists.concat(inputdata));
      console.log("inputdata ==>", inputdata);
      console.log("lists ==>", lists);
    } catch (e) {
      console.log(e);
    }
  }, 
  // [dispatch]
  []
  );

  return (
    <>
      <h3>메뉴추가 게시판</h3>
      <AddBoardBtn>
        <Link to={"/addBoard/write"}>작성하</Link>
      </AddBoardBtn>
      {lists.map((data) => {
        <div key={data.aNo}>
          <div>{data.aNo}</div>
        </div>;
      })}
    </>
  );
};

export default withRouter(AddListBoardPage);
