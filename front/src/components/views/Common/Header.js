import React from "react";
// import { Menu } from "antd";
import axios from "axios";
import LeftMenu from "./LeftMenu";
import { USER_SERVER } from "../../../hoc/Config";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ImgStyled = styled.div`
`;

function Header(props) {
  const logoImg = "/images/logo512.png";
  const user = useSelector((state) => state.user);
  console.log("user.userData ==> ", user.userData, ",");

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push("/users/login");
      } else {
        alert("Log Out Failed");
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <div className="headerDIv">
        <div className="headerInDiv">
          <ImgStyled className="headerImage">
            <Link to={"/"}>
              <img src={logoImg} className="logo" />
            </Link>
          </ImgStyled>
          <LeftMenu />
          <div
            className="header_right"
          >
            <ul className="loginLink">
              <li>
                <Link to={"/users/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/users/register"}>Signup</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="headerDIv">
        <div className="headerInDiv">
        <ImgStyled className="headerImage">
            <Link to={"/"}>
              <img src={logoImg} className="logo" />
            </Link>
          </ImgStyled>
        <LeftMenu />
        <div className="header_right" style={{ width: "150px" }}>
          <></>
          <ul className="loginLink">
            <li>
              <Link to onClick={logoutHandler}>Logout</Link>
            </li>
          </ul>
        </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
