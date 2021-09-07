import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../Book.scss";
import Moment from "react-moment";
const KBookPage = () => {
  const user = useSelector((state) => state.user);

  const [lists, setLists] = useState([
    {
      kBookNo: "",
      kBookTitle: "",
      kBookImg: "",
      // kBookReply:"",
    },
  ]);

  const [reply, setReply] = useState([
    // {
    //   kBookReUserid: "",
    //   kBookReComment: "",
    //   kBookReDate: "",
    // },
  ]);

  // const dispatch = useDispatch();

  useEffect(async () => {
    try {
      const res = await axios.get("/kBook");
      const inputdata = await res.data.data.kBook.map((data) => ({
        kBookNo: data.kBookNo,
        kBookTitle: data.kBookTitle,
        kBookImg: data.kBookImg,
        // kBookReply: data.kBookReply,
      }));

      setLists(inputdata[0]);
      const kBookmNo = inputdata[0].kBookNo;
      console.log("kobbokmno====>,,,", kBookmNo);

      const replyres = await axios.get(`/kBook/${kBookmNo}`);
      console.log("ㅁㅁㅁㅁㅁ");
      const replydata = await replyres.data.data.kBookReply.map((data) => ({
        kBookReUserid: data.kBookReUserid,
        kBookReComment: data.kBookReComment,
        kBookReDate: data.kBookReDate,
      }));
      console.log("replydata ==> ", replydata);
      setReply(reply.concat(replydata));
      console.log("lists==>", lists);
    } catch (error) {
      console.log("!!", error);
    }
  }, []);

  //댓글 write
  const [writereply, setWriteReply] = useState("");

  const writereplyChange = (e) => {
    setWriteReply(e.currentTarget.value);
  };

  const writeReplySubmit = (e) => {
    axios.post(`/kBook/kBookReply/write`, {
      kBookmNo: lists.kBookNo,
      kBookReComment: writereply,
    });

    setWriteReply("");
    // history.push(`/kBook`);
  };
  return (
    <div className="component">
      <ul className="align">
        <li>
          <figure className="book">
            {/* <!-- Front --> */}
            <ul className="hardcover_front">
              <li>
                <img src={`/k.jpg`} className="bookSubImg" />
              </li>
              <li></li>
            </ul>
            {/* <!-- Pages -->  */}
            <ul className="page">
              <li></li>
              <li key={lists.kBookNo}>
                <h2>{lists.kBookTitle}</h2>
                <Link to="/SearchPlace" className="btn">
                  <img src={`/${lists.kBookImg}`} />
                </Link>
              </li>
              <li className="transform"><img src={`/k.jpg`} className="bookSubImg" /></li>
              <li><h2>불고기</h2> <img src={`/불고기1620290784643.jpg`} /></li>
              <li><h2>비빔밥</h2> <img src={`/비빔밥1620290806192.jpg`} /></li>
              <li><h2>삼겹살</h2> <img src={`/삼겹살1620290815780.jpg`} /></li>
              <li><h2>갈비</h2> <img src={`/갈비1620290825156.jpg`} /></li>
              <li><h2>청국장</h2> <img src={`/청국장1620290834644.jpg`} /></li>
              <li><h2>떡볶이</h2> <img src={`/떡볶이1620290843804.jpg`} /></li>
              <li><h2>고등어구이</h2>{" "}<img src={`/고등어 구이1620290855091.jpg`} /></li>
              <li><h2>육회</h2> <img src={`/육회1620290865661.jpg`} /></li>
              <li><h2>계란찜</h2> <img src={`/계란찜1620290888583.jpg`} /></li>
              <li><h2>제육볶음</h2> <img src={`/제육볶음1620290898748.jpg`} /></li>
              <li><h2>떡만둣국</h2> <img src={`/떡만둣국1620290918408.jpg`} /></li>
              <li><h2>냉면</h2> <img src={`/냉면1620291758272.jpg`} /></li>
            </ul>
            {/* <!-- Back --> */}
            <ul className="hardcover_back">
              <li></li>
              <li></li>
            </ul>
            <ul className="book_spine">
              <li></li>
              <li></li>
            </ul>
          </figure>
        </li>
      </ul>
      {/* 댓글 */}
      <form className="bookreply_form" onSubmit={writeReplySubmit}>
        <textarea type="text" onChange={writereplyChange} value={writereply} />
        <button>등록</button>
      </form>
      {reply.map((re) => {
        return (
          <div className="bookreply_content">
            <div>
              {re.kBookReUserid}</div>
              <div><Moment format="YYYY/MM/DD">{re.kBookReDate}</Moment></div>
            
            <div>{re.kBookReComment}</div>
            <hr style={{ border: "1px solid khaki" }} />
          </div>
        );
      })}
    </div>
  );
};

export default withRouter(KBookPage);
