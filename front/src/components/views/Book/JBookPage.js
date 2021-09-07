import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../Book.scss";
import Moment from "react-moment";

const JBookPage = () => {
  const user = useSelector((state) => state.user);


  const [lists, setLists] = useState([
    {
      jBookNo: "",
      jBookTitle: "",
      jBookImg: "",
      // jBookReply:"",
    },
  ]);

  const [reply, setReply] = useState([
    // {
    //   jBookReUserid: "",
    //   jBookReComment: "",
    //   jBookReDate: "",
    // },
  ]);

  // const dispatch = useDispatch();

  useEffect(async () => {
    try {

      const res = await axios.get("/jBook");
      const inputdata = await res.data.data.jBook.map((data) => ({
        jBookNo: data.jBookNo,
        jBookTitle: data.jBookTitle,
        jBookImg: data.jBookImg,
        // jBookReply: data.jBookReply,
      }));

      setLists(inputdata[0]);
      const jBookmNo =inputdata[0].jBookNo;
      console.log('jobbokmno====>,,,',jBookmNo);

      const replyres = await axios.get(`/jBook/${jBookmNo}`);
      const replydata = await replyres.data.data.jBookReply.map((data) => ({
        jBookReUserid: data.jBookReUserid,
        jBookReComment: data.jBookReComment,
        jBookReDate: data.jBookReDate,
      }));
      console.log("replydata ==> ", replydata);
      setReply(reply.concat(replydata));
      console.log("lists==>", lists);
    } catch (error) {
      console.log('!!',error);
    }
  }, []);

  //댓글 write
  const [writereply, setWriteReply] = useState("");

  const writereplyChange = (e) => {
    setWriteReply(e.currentTarget.value);
  };

  const writeReplySubmit = (e) => {
    
    axios.post(`/jBook/jBookReply/write`, {
      jBookmNo: lists.jBookNo,
      jBookReComment: writereply,
    });
    
    setWriteReply("");
    // history.push(`/jBook`);
  };
  return (
    <div className="component">
      <ul className="align">
        <li>
            <figure className="book">
                {/* <!-- Front --> */}
                <ul className="hardcover_front">
                  <li>
                    <img src={`/j.jpg`} className="bookSubImg" />
                  </li>
                  <li></li>
                </ul>
                {/* <!-- Pages -->  */}
                <ul className="page">
                  <li></li>
                  <li key={lists.jBookNo}>
                    <h2>{lists.jBookTitle}</h2>
                    <Link to="SearchPlace" className="btn">
                    <img src={`/${lists.jBookImg}`}/>
                    </Link>
                  </li>
                  <li className="transform"><img src={`/j.jpg`} className="bookSubImg" /></li>
                  <li><h2>미소국</h2> <img src={`/미소국1620286243927.jpg`} /></li>
                  <li><h2>돈카츠</h2> <img src={`/돈카츠1620286254267.jpg`} /></li>
                  <li><h2>튀김</h2> <img src={`/튀김1620286267983.jpg`} /></li>
                  <li><h2>타코야끼</h2> <img src={`/타코야끼1620286278897.jpg`} /></li>
                  <li><h2>돈카츠 덮밥</h2> <img src={`/돈까스 덮밥1620286291253.jpg`} /></li>
                  <li><h2>덮밥</h2> <img src={`/덮밥1620286302199.jpg`} /></li>
                  <li><h2>생선모듬회</h2> <img src={`/생선모듬회1620286313492.png`} /></li>
                  <li><h2>전복 버터구이</h2> <img src={`/전복 버터구이1620286324068.jpg`} /></li>
                  <li><h2>튀김두부</h2> <img src={`/튀김두부1620286350552.jpg`} /></li>
                  <li><h2>메밀소바</h2> <img src={`/메밀소바1620286606327.jpg`} /></li>
                  <li><h2>생선카츠</h2> <img src={`/생선까스1620286616269.jpg`} /></li>
                  <li><h2>연어 초밥</h2> <img src={`/연어 초밥1620286637879.jpg`} /></li>
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
        <textarea type="text" onChange={writereplyChange} value={writereply} placeholder="내용을 입력해주세요." />
        <button>등록</button>
      </form>
      {reply.map((re) => {
        return (
          <div className="bookreply_content">
            <div>{re.jBookReUserid} </div>
              
              <div><Moment format="YYYY/MM/DD">{re.jBookReDate}</Moment></div>
            <div>{re.jBookReComment}</div>
            <hr style={{border:'1px solid khaki'}}/>
          </div>
        );
      })}
    </div>
  );
};

export default withRouter(JBookPage);
