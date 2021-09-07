import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../Book.scss";
import Moment from "react-moment";

const CBookPage = () => {
  const user = useSelector((state) => state.user);

  const [lists, setLists] = useState([
    {
      cBookNo: "",
      cBookTitle: "",
      cBookImg: "",
    },
  ]);

  const [reply, setReply] = useState([

  ]);

  useEffect(async () => {
    try {
      const res = await axios.get("/cBook");
      const inputdata = await res.data.data.cBook.map((data) => ({
        cBookNo: data.cBookNo,
        cBookTitle: data.cBookTitle,
        cBookImg: data.cBookImg,
      }));

      setLists(inputdata[0]);
      const cBookmNo = inputdata[0].cBookNo;
      console.log("cobbokmno====>,,,", cBookmNo);

      const replyres = await axios.get(`/cBook/${cBookmNo}`);
      const replydata = await replyres.data.data.cBookReply.map((data) => ({
        cBookReUserid: data.cBookReUserid,
        cBookReComment: data.cBookReComment,
        cBookReDate: data.cBookReDate,
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
    axios.post(`/cBook/cBookReply/write`, {
      cBookmNo: lists.cBookNo,
      cBookReComment: writereply,
    });

    setWriteReply("");
  };

  return (
    <div className="component">
      <ul className="align">
        <li>
          <figure className="book">
            {/* <!-- Front --> */}
            <ul className="hardcover_front">
              <li>
                <img src={`/c.jpg`} className="bookSubImg" />
              </li>
              <li></li>
            </ul>
            {/* <!-- Pages -->  */}
            <ul className="page">
              <li></li>
              <li key={lists.cBookNo}>
                <h2>{lists.cBookTitle}</h2>
                <Link to="/SearchPlace" className="btn">
                  <img src={`/${lists.cBookImg}`} />
                </Link>
              </li>
              <li className="transform"><img src={`/c.jpg`} className="bookSubImg" /></li>
              <li><h2>짬뽕</h2> <img src={`/짬뽕1620281976812.jfif`} /></li>
              <li><h2>탕수육</h2> <img src={`/탕수육1620281990652.jpg`} /></li>
              <li><h2>마파두부</h2> <img src={`/마파두부1620282169191.jpg`} /></li>
              <li><h2>라조기</h2> <img src={`/라조기1620282194672.jfif`} /></li>
              <li><h2>유산슬</h2> <img src={`/유산슬1620282233658.jfif`} /></li>
              <li><h2>팔보채</h2> <img src={`/팔보채1620282246019.jfif`} /></li>
              <li><h2>기스면</h2> <img src={`/기스면1620282257324.jpg`} /></li>
              <li><h2>깐풍기</h2> <img src={`/깐풍기1620292181858.jpg`} /></li>
              <li><h2>고추잡채</h2> <img src={`/고추잡채1620282221340.jpg`} /></li>
              <li><h2>짜장밥</h2> <img src={`/짜장밥1620292201194.jpg`} /></li>
              <li><h2>해파리냉채</h2> <img src={`/해파리냉채1620292210161.jpg`} /></li>
              <li><h2>양장피</h2> <img src={`/볶음밥1620292222578.jpg`} /></li>
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
            <div>{re.cBookReUserid}</div>
            <div>
              <Moment format="YYYY/MM/DD">{re.cBookReDate}</Moment>
            </div>
            <div>{re.cBookReComment}</div>
            <hr style={{ border: "1px solid khaki" }} />
          </div>
        );
      })}
    </div>
  );
};

export default withRouter(CBookPage);
