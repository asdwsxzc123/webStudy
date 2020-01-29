import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import './App.css';

import Header from '../common/Header';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Submit from './Submit';
import Journey from './Journey';
import CitySelector from '../common/CitySelector';
import DateSelector from '../common/DateSelector';
import {
  showCitySelector,
  exchangeFromTo,
  hideCitySelector,
  fetchCityData,
  setSelectedCity,
  showDateSelector,
  hideDateSelector,
  setDepartDate,
  toggleHighSpeed
} from './actions';
import { bindActionCreators } from 'redux';

import { h0 } from '../common/fp';

function App(props) {
  const {
    from,
    to,
    cityData,
    isCitySelectVisible,
    isDateSelectorVisible,
    isLoadingCityData,
    dispatch,
    departDate,
    highSpeed
  } = props;
  // 减少重渲染
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  const cbs = useMemo(() => {
    return bindActionCreators(
      {
        exchangeFromTo,
        showCitySelector
      },
      dispatch
    );
  }, [dispatch]);
  const citySelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideCitySelector,
        fetchCityData,
        onSelect: setSelectedCity
      },
      dispatch
    );
  }, [dispatch]);

  const departDateCbs = useMemo(() => {
    return bindActionCreators(
      {
        onClick: showDateSelector
      },
      dispatch
    );
  }, [dispatch]);
  const dateSelectorCbs = useMemo(() => {
    return bindActionCreators(
      {
        onBack: hideDateSelector
      },
      dispatch
    );
  }, [dispatch]);

  const highSpeedCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggle: toggleHighSpeed
      },
      dispatch
    );
  }, [dispatch]);

  const onSelectDate = useCallback(
    day => {
      if (!day) {
        return;
      }
      if (day < h0()) {
        return;
      }
      dispatch(setDepartDate(day));
      dispatch(hideDateSelector());
    },
    [dispatch]
  );

  return (
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack} />
      </div>
      <form action="/query.html" className="form">
        <Journey from={from} to={to} {...cbs} />
        <DepartDate time={departDate} {...departDateCbs} />
        <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
        <Submit />
        <CitySelector
          cityData={cityData}
          show={isCitySelectVisible}
          isLoading={isLoadingCityData}
          {...citySelectorCbs}
        />
        <DateSelector
          show={isDateSelectorVisible}
          {...dateSelectorCbs}
          onSelect={onSelectDate}
        />
      </form>
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
