import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../Book.scss";
import Moment from "react-moment";

const WBookPage = () => {
  const user = useSelector((state) => state.user);


  const [lists, setLists] = useState([
    {
      wBookNo: "",
      wBookTitle: "",
      wBookImg: "",
      // wBookReply:"",
    },
  ]);

  const [reply, setReply] = useState([
    // {
    //   wBookReUserid: "",
    //   wBookReComment: "",
    //   wBookReDate: "",
    // },
  ]);

  // const dispatch = useDispatch();

  useEffect(async () => {
    try {

      const res = await axios.get("/wBook");
      const inputdata = await res.data.data.wBook.map((data) => ({
        wBookNo: data.wBookNo,
        wBookTitle: data.wBookTitle,
        wBookImg: data.wBookImg,
        // wBookReply: data.wBookReply,
      }));

      setLists(inputdata[0]);
      const wBookmNo =inputdata[0].wBookNo;
      console.log('wobbokmno====>,,,',wBookmNo);

      const replyres = await axios.get(`/wBook/${wBookmNo}`);
      const replydata = await replyres.data.data.wBookReply.map((data) => ({
        wBookReUserid: data.wBookReUserid,
        wBookReComment: data.wBookReComment,
        wBookReDate: data.wBookReDate,
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
    
    axios.post(`/wBook/wBookReply/write`, {
      wBookmNo: lists.wBookNo,
      wBookReComment: writereply,
    });
    
    setWriteReply("");
    // history.push(`/wBook`);
  };
  return (
    <div className="component">
      <ul className="align">
        <li>
            <figure className="book">
                {/* <!-- Front --> */}
                <ul className="hardcover_front">
                  <li>
                    <img src={`/w.jpg`} className="bookSubImg" />
                  </li>
                  <li></li>
                </ul>
                {/* <!-- Pages -->  */}
                <ul className="page">
                  <li></li>
                  <li key={lists.wBookNo}>
                    <h2 className="search_title">{lists.wBookTitle}</h2>
                    <Link to="/SearchPlace" className="btn">
                    <img src={`/${lists.wBookImg}`}/>
                    </Link>
                  </li>
                  <li className="transform"><img src={`/w.jpg`} className="bookSubImg" /></li>
                  <li><h2>치킨 와플</h2> <img src={`/치킨 와플1620284860943.jpg`} /></li>
                  <li><h2>연어 스테이크</h2> <img src={`/연어 스테이크1620284873254.jpg`} /></li>
                  <li><h2>파스타 콩요리</h2> <img src={`/파스타 콩요리1620284899012.jpg`} /></li>
                  <li><h2>새우 리조또</h2> <img src={`/토마토 새우 리조또1620284913076.png`} /></li>
                  <li><h2>토마토 크레페</h2> <img src={`/토마토 페이스트 크레페1620284925891.jpg`} /></li>
                  <li><h2>해산물 스프</h2> <img src={`/무띠 파인리 해산물 스프1620284942227.jpg`} /></li>
                  <li><h2>조개 버터구이</h2> <img src={`/조개 버터구이1620284962461.png`} /></li>
                  <li><h2>브루스케타</h2> <img src={`/토마토 브루스케타1620284974212.png`} /></li>
                  <li><h2>캐비어 파스타</h2> <img src={`/차이브 캐비어 파스타1620284985333.png`} /></li>
                  <li><h2>깔조네</h2> <img src={`/깔조네1620284994352.png`} /></li>
                  <li><h2>샐러드</h2> <img src={`/지중해풍 샐러드1620285008201.png`} /></li>
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
              {re.wBookReUserid}</div>
              <div><Moment format="YYYY/MM/DD">{re.wBookReDate}</Moment></div>
            <div>{re.wBookReComment}</div>
            <hr style={{border:'1px solid khaki'}} />
          </div>
        );
      })}
    </div>
  );
};

export default withRouter(WBookPage);
