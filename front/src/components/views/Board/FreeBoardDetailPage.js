import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link, matchPath, withRouter } from "react-router-dom";
import * as qs from "query-string";
import { ButtonToolbar, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getReplyRead } from "../../../_actions/board_action";
import Moment from "react-moment";

const TableDivStyled = styled.div`
  width: 650px;
  margin: auto;
  table {
    width: 650px;
    th,
    td {
      white-space: normal;
      border: 1px solid #444444;
    }
    text-align: center;
    th {
      width: 80px;
    }
    td {
      width: 150px;
    }
    .fTitle {
      word-break:break-all;
      width: 540px;
    }
    .writeContent {
      div{
        img{
          max-width:200px;
          max-height:210px;
        }
      }
      width: 540px; 
      word-break:break-all;
      height: 400px;
    }
  }
`;
const ReplyContentStyled = styled.div`
  width: 660px;
  margin: auto;
  form {
    input {
      vertical-align: middle;
      width: 500px;
      height: 30px;
    }
    div {
    vertical-align: middle;
    display: inline-block;
    margin: 15px 15px 15px 0;
    button {
      box-shadow: 2px 2px 2px gray;
      border-radius: 20px;
      vertical-align: middle;
      width: 100px;
      height: 30px;
      font-size: 15px;
      margin: 0 0 0 20px;
      background-color:salmon;
      color:white;
    }
  }
  }
`;
const ReplyListStyled = styled.div`
  div{
    width:700px;
  }
  `;

const UserClickStyled = styled.div`
  div {
    vertical-align: middle;
    display: inline-block;
    margin: 15px 15px 15px 0;
    button {
      background-color:salmon;
      color:white;
      box-shadow: 2px 2px 2px gray;
      border-radius: 20px;
      vertical-align: middle;
      width: 100px;
      height: 30px;
      font-size: 15px;
      margin: 0 0 0 20px;
    }
  }
`;

const ReplyItemStyled = styled.div`
  width: 750px;
  div {
    display: inline-block;
  }
  .reUserid {
    vertical-align: middle;
    width: 150px;
    margin: 0 15px 0 0;
  }
  .reContent {
    white-space: normal;
    width: 300px;
    margin: 0 15px 0 0;
  }
  .reDate {
    width: 150px;
  }
`;

const FreeBoardDetailPage = ({ match, props, history }) => {
  const user = useSelector((state) => state.user);
  console.log("user.userData", user);

  const onDelClick = (e) => {
    // console.log('user.userData.id ==> ',user.userData.id)
    if (user.userData.isAuth == false) {
      history.push("/users/login");
    } else if (user.userData.id != lists.fUserid) {
      alert("해당 사용자가 아닙니다.");
      return false;
    } else {
      const con = window.confirm("삭제하시겠습니까?");
      if (con == true) {
        const delNum = match.params.fno;
        axios
          .delete(`/freeBoard/del/${delNum}`)
          .then(history.push("/freeBoard"));
      } else {
        return false;
      }
    }
  };

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

  const [reply, setReply] = useState([
    // {
    //   fReUserid: "",
    //   fReComment: "",
    //   fReDate: "",
    // },
  ]);

  const dispatch = useDispatch();

  useEffect(
    async () => {
      try {
        const fNo = match.params.fno;
        dispatch(getReplyRead(fNo));
        const res = await axios.get(`/freeBoard/${fNo}`);
        const inputdata = await res.data.data.freeboard.map((data) => ({
          fNo: data.fNo,
          fTitle: data.fTitle,
          fUserid: data.fUserid,
          fContent: data.fContent,
          fDate: data.fDate,
          fLike: data.fLike,
          fView: data.fView,
        }));
        // 댓글
        const replydata = await res.data.data.Reply.map((data) => ({
          fReNo:data.fReNo,
          fReUserid: data.fReUserid,
          fReComment: data.fReComment,
          fReDate: data.fReDate,
        }));
        console.log("replydata ==> ", replydata);
        setLists(inputdata[0]);
        setReply(reply.concat(replydata));
      } catch (error) {
        console.log(error);
      }
    },
    // []
    [dispatch]
  );

  // useEffect(() => {
  //   const fNo = match.params.fno;
  //   dispatch(getReplyRead(fNo));
  // }, [dispatch]);

  const [writereply, setWriteRely] = useState("");

  const writereplyChange = (e) => {
    setWriteRely(e.currentTarget.value);
  };

  const writeReplySubmit = (e) => {
    // e.preventDefault();
    const fNo = match.params.fno;
    if (user.userData.isAuth == false) {
      history.push("/users/login");
    } else if (writereply == "") {
      return alert("댓글을 입력하시오");
    } else {
      axios.post(`/freeBoard/fReply/write/${fNo}`, {
        fBoardNo: fNo,
        fReComment: writereply,
      });
      setWriteRely("");
      // .then((res) => alert('resresresresresresres',res)).catch(e => {console.log(e)});
      history.push(`/freeBoard/${fNo}`);
    }
  };

  const updateButton = () => {
    if (user.userData.isAuth == false) {
      history.push("/users/login");
    } else if (user.userData.id != lists.fUserid) {
      alert("해당 사용자가 아닙니다.");
      return false;
    } else {
      const con = window.confirm("수정페이지 이동시 그 전 내용은 삭제됩니다.");
      if (con == true) {
        history.push(`/freeBoardupdate/${lists.fNo}`);
      } else {
        return false;
      }
    }
  };

  const onClickFreeBoardList=() =>{
    history.push('/freeBoard')
  }

  return (
    <div className='FreeBoardDetailDiv'>
      <TableDivStyled className="FreeBoardDetailTableDiv">
        <table key={lists.fNo}>
          <tr>
            <th>글번호</th>
            <td>{lists.fNo}</td>
            <th>작성자</th>
            <td>{lists.fUserid}</td>
          </tr>
          <tr>
            <th>작성날짜</th>
            <td>
              <Moment format="YYYY/MM/DD">{lists.fDate}</Moment>
            </td>
            <th>조회수</th>
            <td>{lists.fView}</td>
          </tr>
          <tr>
            <th>제목</th>
            <td colspan="3" className="fTitle" >
              {lists.fTitle}
            </td>
          </tr>
          <tr>
            <th className="content">내용</th>
            <td className="writeContent" colspan="3">
              <div dangerouslySetInnerHTML={{ __html: lists.fContent }} />
            </td>
          </tr>
        </table>
        <UserClickStyled className="FreeBoardDetailButtonDiv">
          <div>
            <button onClick={onClickFreeBoardList}>목록</button>
          </div>
          {/* 하지만 새로 고침시 useSelector가 사라져서 오류가 뜬다.... */}
          {/* {user.userData.id == lists.fUserid ? ( */}
          <div>
            <button onClick={updateButton}>수정하기</button>
          </div>
          <div>
            <button onClick={onDelClick}>삭제</button>
          </div>
          {/* ) : (
            <></>
          )} */}
        </UserClickStyled>
      </TableDivStyled>
      <ReplyContentStyled className="ReplyContentStyled">
        <form onSubmit={writeReplySubmit}>
          <input type="text" onChange={writereplyChange} value={writereply} />
          <div><button className="but">작성하기</button></div>
        </form>
        <ReplyListStyled className="ReplyListStyled">
          {reply.map((re) => {
            return (
              <ReplyItemStyled key={re.fReNo} className="ReplyItem">
                <div className="reUserid">{re.fReUserid}</div>
                <div className="reContent">{re.fReComment}</div>
                <div className="reDate">
                  <Moment format="YYYY/MM/DD">{re.fReDate}</Moment>
                </div>
                <hr />
              </ReplyItemStyled>
            );
          })}
        </ReplyListStyled>
      </ReplyContentStyled>
    </div>
  );
};

export default withRouter(FreeBoardDetailPage);
