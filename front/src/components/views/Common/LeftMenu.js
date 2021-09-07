import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { useDetectOutsideClick } from "./useDetectOutsideClick";

const LeftMenu = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);


  return (
    <div className="container">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>커뮤니티</span>
        </button>
        <nav
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            <li>
              <Link to={"/freeBoard"}>자유게시판</Link>
            </li>
            <li>
              <Link to={"/addBoard"}>신청게시판</Link>
            </li>
            <li>
            <Link to={"/SearchPlace"}>카카오맵</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default withRouter(LeftMenu);
