import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFreeBoardList,getUpdateBoardList,getDeleteBoardList } from "../../../_actions/board_action";
import Moment from "react-moment";

const ListStyled = styled.div`
  width: 860px;
  margin: auto;
  table {
    tr {
      th {
        text-align: center;
        width: 150px;
      }
      .date {
        width: 250px;
      }
      td {
        text-align: center;
      }
    }
  }
`;

const ListDivStyled = styled.div`
  color: black;
  text-decoration:none;
  text-align: center;
  width: 1200px;
  margin: auto;
`;

const ListItemDivStyled = styled.div`
  padding: 0.5rem;
  text-align: center;
  border: 1px solid  rgb(185, 185, 185);
  border-radius:13px;
  margin: 1.5rem;
  width: 280px;
  display: inline-block;
  .nu {
    div {
      display: inline-block;
      margin: 5px;
    }
  }
  .dv {
    div {
      display: inline-block;
      margin: 5px;
    }
  }
  .fTitle {
    /* white-space:normal; */
    width: 270px;
    margin: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Lists = () => {
  const [lists, setLists] = useState([
    // {
    //   fNo: "",
    //   fTitle: "",
    //   fUserid: "",
    //   fContent: "",
    //   fDate: "",
    //   fLike: "",
    //   fView: "",
    // },
  ]);
  const dispatch = useDispatch();

  const user = useSelector((state) => state);
  console.log("user.userData ==> ", user, ",");

  useEffect(async () => {
    try {
      dispatch(getFreeBoardList());
      dispatch(getUpdateBoardList());
      dispatch(getDeleteBoardList());
      const res = await axios.get("/freeBoard");
      const inputdata = await res.data.freeboard.map((data) => ({
        fNo: data.fNo,
        fTitle: data.fTitle,
        fUserid: data.fUserid,
        fDate: data.fDate,
        fLike: data.fLike,
        fView: data.fView,
      }));
      setLists(lists.concat(inputdata));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch,getUpdateBoardList,getDeleteBoardList]);


  return (
    <ListDivStyled className="ListDivStyled">
      {lists.map((list) => (
        <ListItemDivStyled key={list.fNo}  className="ListItemDivStyled">
          <Link to={`/freeBoard/${list.fNo}`} >
            <div className="nu">
              <div className="fno">{list.fNo}</div>
              <div className="fUserid">{list.fUserid}</div>
            </div>
            <div className="fTitle">{list.fTitle}</div>
            <div className="dv">
              <div className="fDate">
                <Moment format="YYYY/MM/DD">{list.fDate}</Moment>
              </div>
              <div className="fView">{list.fView}</div>
            </div>
          </Link>
        </ListItemDivStyled>
      ))}
    </ListDivStyled>
  );
};

export default withRouter(Lists);
