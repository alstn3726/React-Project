// SearchPlace.js

import React, { useState } from "react";
import { withTheme } from "styled-components";
import MapContainer from "./MapContainer"

const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <div className="kakaomap">
      <form className="inputForm" onSubmit={handleSubmit}>
        <input 
        // style={{padding:"16px 50px 13px 15px"}}
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
          className="SearchPlaceinput"
        />
        <button type="submit" style={{color:"white",
      background:"teal",
      padding: "0.6rem 1rem",
      border: "3px solid teal",
      fontSize:"1rem",
      borderRadius:"0.3rem",
      lineHeight:"1.5",
      cursor:"pointer"
     }}>검색</button>
      </form>
      <MapContainer searchPlace={place} />
    </div>
  );
};

export default SearchPlace;