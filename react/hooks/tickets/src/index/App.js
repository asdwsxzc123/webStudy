import React, { useCallback } from "react";
import { connect } from "react-redux";
import "./App.css";

import Header from "../common/Header";
import DepartDate from "./DepartDate";
import HighSpeed from "./HighSpeed";
import Submit from "./Submit";
import Journey from "./Journey";

import { showCitySelector, exchangeFromTo } from "./actions";

function App(props) {
  const { from, to, dispatch } = props;
  // 减少重渲染
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  // const doExchangeFromTo = use
  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <Journey
        from={from}
        to={to}
        showCitySelector={m => dispatch(showCitySelector(m))}
        exchangeFromTo={() => dispatch(exchangeFromTo())}
      />
      <DepartDate />
      <HighSpeed />
      <Submit />
    </div>
  );
}
export default connect(
  function mapStateToProps(state) {
    return state;
  },
  function mapDispatchToProps(dispatch) {
    return { dispatch };
  }
)(App);
