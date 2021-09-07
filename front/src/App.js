import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import FreeBoardListPage from "./components/views/Board/FreeBoardListPage";
import FreeBoardWritePage from "./components/views/Board/FreeBoardWritePage";
import FreeBoardUpdate from "./components/views/Board/FreeBoardUpdatePage";
import FreeBoardDetail from "./components/views/Board/FreeBoardDetailPage";
// import addBoardListPage from "./components/views/Board/AddListBoardPage";
import AddBoardWritePage from "./components/views/Board/AddBoardWritePage";
import AddBoardPage from "./components/views/Board/AddBoardPage";
import Header from "./components/views/Common/Header";
// import FoodBoardListPage from "./components/views/Board/FoodBoardListPage";
import cBookPage from "./components/views/Book/CBookPage";
import jBookPage from "./components/views/Book/JBookPage";
import kBookPage from "./components/views/Book/KBookPage";
import wBookPage from "./components/views/Book/WBookPage";
import SearchPlace from "./SearchPlace";
import KimNkangPage from "./components/views/admin/KimNkangPage";

function App() {
  return (
    <div className="AppMainPage1">
      <div className="AppMainPage">
        <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Header mode="inline" />
            <div>
              {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
              <Switch>
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route
                  exact
                  path="/users/login"
                  component={Auth(LoginPage, false)}
                />
                <Route
                  exact
                  path="/users/register"
                  component={Auth(RegisterPage, false)}
                />
                <Route
                  exact
                  path="/freeBoard"
                  component={Auth(FreeBoardListPage, null)}
                />
                <Route
                  // exact
                  path="/freeBoard/:fno"
                  component={Auth(FreeBoardDetail, null)}
                />
                <Route
                  exact
                  path="/freeBoardwrite"
                  component={Auth(FreeBoardWritePage, true)}
                />
                <Route
                  exact
                  path="/freeBoardupdate/:fno"
                  component={Auth(FreeBoardUpdate, true)}
                />
                <Route
                  exact
                  path="/addBoard"
                  component={Auth(AddBoardPage, null)}
                />
                <Route
                  exact
                  path="/addBoard/write"
                  component={Auth(AddBoardWritePage, true)}
                />
                <Route exact path="/cBook" component={Auth(cBookPage, null)} />
                <Route
                  exact
                  path="/SearchPlace"
                  component={Auth(SearchPlace, null)}
                />
                <Route
                  exact
                  path="/kimNkang"
                  component={Auth(KimNkangPage, null)}
                />
                <Route exact path="/jBook" component={Auth(jBookPage, null)} />
                <Route exact path="/kBook" component={Auth(kBookPage, null)} />
                <Route exact path="/wBook" component={Auth(wBookPage, null)} />
                {/* <Route
              exact
              path="/foodBoard"
              component={Auth(FoodBoardListPage, null)}
            /> */}
              </Switch>
            </div>
          </Router>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
