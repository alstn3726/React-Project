import React, { useEffect } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import Book from "../../../Book";


function LandingPage({ props }) {

  return (
    <div
    >
      {/* <Header/> */}
      <Book />
    </div>
  );
}

export default withRouter(LandingPage);
