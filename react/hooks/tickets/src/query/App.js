import React, { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import URI from "urijs";
import dayjs from "dayjs";

import { h0 } from "../common/fp";
import Header from "../common/Header";
import Nav from "../common/Nav";
import List from "./List";
import Bottom from "./Bottom";

import { setFrom, setTo, setDepartDate, setHighSpeed } from "./actions";

import "./App.css";

function App(props) {
  const { from, to, dispatch } = props;

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { from, to, date, highSpeed } = queries;
    console.log("setFrom");
    console.log(from);
    dispatch(setFrom(from));
    // dispatch(setTo(to))
    // dispatch(setDepartDate(h0(dayjs(date).valueOf())))
  }, [dispatch]);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from} -> ${to}`} onBack={onBack} />
      </div>
      <Nav />
      <List />
      <Bottom />
    </div>
  );
}
export default connect(
  state => state,
  dispatch => ({ dispatch })
)(App);
