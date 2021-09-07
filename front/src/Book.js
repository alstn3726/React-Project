import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./BookMain.scss";


const Book = () => {
  return (
    <div className="component_main">
      <ul className="aligns">
        {/*  <!-- Book 1 --> */}
        <li>
          <figure className="books">
            {/* <!-- Front --> */}
            <Link to="/cBook"><ul className="hardcover_fronts">
              <li>
                <div><img src={`/c.jpg`} className="bookMainImg"/></div>
                {/* <span className="ribbons bestsellers">중식</span> */}
              </li>
              <li></li>
            </ul></Link>
            {/* <!-- Pages -->  */}
            <ul className="pages">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            {/* <!-- Back --> */}
            <ul className="hardcover_backs">
              <li></li>
              <li></li>
            </ul>
            <ul className="book_spines">
              <li></li>
              <li></li>
            </ul>
          </figure>
        </li>
        {/* <!-- Book 2 --> */}
        <li>
          <figure className="books">
            {/* <!-- Front --> */}
            <Link to="/jBook"><ul className="hardcover_fronts">
              <li>
                <div><img src={`/j.jpg`} className="bookMainImg" /></div>
                {/* <span className="ribbons bestsellers">일식</span> */}
              </li>
              <li></li>
            </ul></Link>
            {/* <!-- Pages -->  */}
            <ul className="pages">
            <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            {/* <!-- Back --> */}
            <ul className="hardcover_backs">
              <li></li>
              <li></li>
            </ul>
            <ul className="book_spines">
              <li></li>
              <li></li>
            </ul>
          </figure>
        </li>
        {/* <!-- Book 3 --> */}
        <li>
          <figure className="books">
            {/* <!-- Front --> */}
            <Link to="/kBook"><ul className="hardcover_fronts">
              <li>
               <div><img src={`/k.jpg`} className="bookMainImg" /></div>
                {/* <span className="ribbons bestsellers">한식</span> */}
              </li>
              <li></li>
            </ul></Link>
            {/* <!-- Pages -->  */}
            <ul className="pages">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            {/* <!-- Back --> */}
            <ul className="hardcover_backs">
              <li></li>
              <li></li>
            </ul>
            <ul className="book_spines">
              <li></li>
              <li></li>
            </ul>
          </figure>
        </li>
        {/* book4 */}
        <li>
          <figure className="books">
            {/* <!-- Front --> */}
            <Link to="/wBook"><ul className="hardcover_fronts">
              <li>
                <div><img src={`/w.jpg`} className="bookMainImg" /></div>
                {/* <span className="ribbons bestsellers">양식</span> */}
              </li>
              <li></li>
            </ul></Link>
            {/* <!-- Pages -->  */}
            <ul className="pages">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            {/* <!-- Back --> */}
            <ul className="hardcover_backs">
              <li></li>
              <li></li>
            </ul>
            <ul className="book_spines">
              <li></li>
              <li></li>
            </ul>
          </figure>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(Book);
