import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router";

const KimNkangPage = ({ history }) => {
  const [menu, setMenu] = useState("");
  const [img, setImg] = useState(null);
  //onchange menutitle
  const writeMenu = (e) => {
    console.log(e.currentTarget.value);
    setMenu(e.currentTarget.value);
  };
  //onchang img
  const formData = new FormData();
  const writeImg = (e) => {
    console.log(e.currentTarget.files[0]);
    setImg(e.currentTarget.files[0]);
  };

  //중식
  const cSubmit = async (e) => {
    // e.preventDefault();
    if (menu == "" && img == "") {
      alert("내용이 필요합니다.");
      return false;
    }
    formData.append("file", img);
    formData.append("menu", menu);
    const res = await axios.post("/kimNkang/c", formData);
    console.log(res);
    history.push("/kimNkang");
  };


  //일식
  const jSubmit = async() => {
    if (menu == "" && img == "") {
      alert("내용이 필요합니다.");
      return false;
    }
    formData.append("file", img);
    formData.append("menu", menu);
    await axios.post("/kimNkang/j", formData );
    history.push("/kimNkang");
  };


  //한식
  const kSubmit = async () => {
    if (menu == "" && img == "") {
      alert("내용이 필요합니다.");
      return false;
    }
    formData.append("file", img);
    formData.append("menu", menu);
    await axios.post("/kimNkang/k", formData);
    history.push("/kimNkang");
  };


  //양식
  const wSubmit = async () => {
    if (menu == "" && img == "") {
      alert("내용이 필요합니다.");
      return false;
    }
    formData.append("file", img);
    formData.append("menu", menu);
    await axios.post("/kimNkang/w", formData);
    history.push("/kimNkang");
  };



  return (
    <div>
      <form onSubmit={cSubmit}>
        <h3>중식</h3>
        <input onChange={writeMenu} placeholder="메뉴이름을 작성해주세요" />
        <input
          type="file"
          onChange={writeImg}
          placeholder="메뉴이미지를 넣어주세요"
        />
        <button>추가</button>
      </form>
      <form onSubmit={jSubmit}>
        <h3>일식</h3>
        <input onChange={writeMenu} placeholder="메뉴이름을 작성해주세요" />
        <input
          type="file"
          onChange={writeImg}
          placeholder="메뉴이미지를 넣어주세요"
        />
        <button>추가</button>
      </form>
      <form onSubmit={kSubmit}>
        <h3>한식</h3>
        <input onChange={writeMenu} placeholder="메뉴이름을 작성해주세요" />
        <input
          type="file"
          onChange={writeImg}
          placeholder="메뉴이미지를 넣어주세요"
        />
        <button>추가</button>
      </form>
      <form onSubmit={wSubmit}>
        <h3>양식</h3>
        <input onChange={writeMenu} placeholder="메뉴이름을 작성해주세요" />
        <input
          type="file"
          onChange={writeImg}
          placeholder="메뉴이미지를 넣어주세요"
        />
        <button>추가</button>
      </form>
    </div>
  );
};

export default withRouter(KimNkangPage);
