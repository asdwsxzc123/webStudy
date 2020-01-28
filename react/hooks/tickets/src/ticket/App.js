import React, {
  useEffect,
  useCallback,
  useMemo,
  lazy,
  Suspense
} from 'react';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';

import { h0 } from '../common/fp';
import useNav from '../common/useNav';

import Header from '../common/Header';
import Nav from '../common/Nav';
import Detail from '../common/Detail';
import Candidate from './Candidate';

import { TrainContext } from './context';

import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setDepartDate,
  setSearchParsed,
  prevDate,
  nextDate,
  // 设置值
  setDepartTimeStr,
  setArriveTimeStr,
  setArriveDate,
  setDurationStr,
  setTickets,
  toggleIsScheduleVisible
} from './actions';

import './App.css';
import { bindActionCreators } from 'redux';

const Schedule = lazy(() => import('./Schedule'));

function App(props) {
  const {
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    departStation,
    arriveStation,
    trainNumber,
    durationStr,
    tickets,
    isScheduleVisible,
    searchParsed,

    dispatch
  } = props;

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  useEffect(() => {
    const quereis = URI.parseQuery(window.location.search);
    const { dStation, aStation, date, trainNumber } = quereis;
    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setDepartDate(h0(dayjs(date).valueOf())));

    dispatch(setSearchParsed(true));
  }, [dispatch]);
  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  );
  // 和浏览器相关api都是副作用
  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber]);

  useEffect(() => {
    // 防止报错,如果为空不渲染
    if (!searchParsed) return;
    const url = new URI('/api/ticket')
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
      .setSearch('trainNumber', trainNumber)
      .toString();
    fetch(url)
      .then(res => res.json())
      .then(result => {
        const { detail, candidates } = result;
        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr
        } = detail;

        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setTickets(candidates));
      });
  }, [searchParsed, departDate, trainNumber, dispatch]);

  const detailCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleIsScheduleVisible
      },
      dispatch
    );
  }, [dispatch]);

  if (!searchParsed) return null;
  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title={trainNumber || '未知'} onBack={onBack} />
      </div>
      <div className="nav-wrapper">
        <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prev={prev}
          next={next}
        />
      </div>
      <div className="detail-wrapper">
        <Detail
          departDate={departDate}
          arriveDate={arriveDate}
          departTimeStr={departTimeStr}
          arriveTimeStr={arriveTimeStr}
          trainNumber={trainNumber}
          departStation={departStation}
          arriveStation={arriveStation}
          durationStr={durationStr}
          {...detailCbs}
        />
      </div>
      {isScheduleVisible && (
        <div
          className="mask"
          onClick={() => dispatch(toggleIsScheduleVisible())}
        >
          <Suspense fallback={<div>loading</div>}>
            <Schedule
              date={departDate}
              trainNumber={trainNumber}
              departStation={departStation}
              arriveStation={arriveStation}
            />
          </Suspense>
        </div>
      )}
      <TrainContext.Provider
        value={{
          trainNumber,
          departStation,
          arriveStation,
          departDate
        }}
      >
        <Candidate tickets={tickets} />
      </TrainContext.Provider>
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
