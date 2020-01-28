import React, { useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';

import { h0 } from '../common/fp';
import useNav from '../common/useNav';
import Header from '../common/Header';
import Nav from '../common/Nav';
import List from './List';
import Bottom from './Bottom';

import {
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  setSearchParsed,
  setTrainList,
  setTicketTypes,
  setTrainTypes,
  setDepartStations,
  setArriveStations,
  prevDate,
  nextDate,
  toggleHighSpeed,
  toggleOrderType,
  toggleIsFiltersVisible,
  toggleOnlyTickets,
  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setCheckedDepartStations,
  setCheckedArriveStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArriveTimeStart,
  setArriveTimeEnd
} from './actions';

import './App.css';
import { bindActionCreators } from 'redux';

function App(props) {
  const {
    trainList,
    from,
    to,
    dispatch,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    isFiltersVisible,
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  } = props;

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { from, to, date, highSpeed } = queries;
    dispatch(setFrom(from));
    dispatch(setTo(to));
    dispatch(setDepartDate(h0(dayjs(date * 1).valueOf())));
    dispatch(setHighSpeed(highSpeed === 'true'));

    dispatch(setSearchParsed(true));
  }, [dispatch]);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }
    const url = new URI('/api/query')
      .setSearch('from', from)
      .setSearch('to', to)
      .setSearch(
        'departDate',
        dayjs(departDate).format('YYYY-MM-DD')
      )
      .setSearch('highSpeed', highSpeed)
      .setSearch('searchParsed', searchParsed)
      .setSearch('orderType', orderType)
      .setSearch('onlyTickets', onlyTickets)
      .setSearch(
        'checkedTicketTypes',
        Object.keys(checkedTicketTypes).join()
      )
      .setSearch(
        'checkedTrainTypes',
        Object.keys(checkedTrainTypes).join()
      )
      .setSearch(
        'checkedDepartStations',
        Object.keys(checkedDepartStations).join()
      )
      .setSearch(
        'checkedArriveStations',
        Object.keys(checkedArriveStations).join()
      )
      .setSearch('departTimeStart', departTimeStart)
      .setSearch('departTimeEnd', departTimeEnd)
      .setSearch('arriveTimeStart', arriveTimeStart)
      .setSearch('arriveTimeEnd', arriveTimeEnd)
      .toString();

    fetch(url)
      .then(res => res.json())
      .then(result => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: {
                ticketType,
                trainType,
                depStation,
                arrStation
              }
            }
          }
        } = result;

        dispatch(setTrainList(trains));
        dispatch(setTicketTypes(ticketType));
        dispatch(setTrainTypes(trainType));
        dispatch(setDepartStations(depStation));
        dispatch(setArriveStations(arrStation));
      });
  }, [
    dispatch,
    from,
    to,
    departDate,
    highSpeed,
    searchParsed,
    orderType,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd
  ]);
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  const { isPrevDisabled, isNextDisabled, prev, next } = useNav(
    departDate,
    dispatch,
    prevDate,
    nextDate
  );

  const bottomCbs = useMemo(() => {
    return bindActionCreators(
      {
        toggleHighSpeed,
        toggleOrderType,
        toggleIsFiltersVisible,
        toggleOnlyTickets,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArriveTimeStart,
        setArriveTimeEnd
      },
      dispatch
    );
  }, [dispatch]);

  if (!searchParsed) return null;

  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from} -> ${to}`} onBack={onBack} />
      </div>
      <Nav
        date={departDate}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        prev={prev}
        next={next}
      />
      <List list={trainList} />
      <Bottom
        highSpeed={highSpeed}
        orderType={orderType}
        onlyTickets={onlyTickets}
        isFiltersVisible={isFiltersVisible}
        ticketTypes={ticketTypes}
        trainTypes={trainTypes}
        departStations={departStations}
        arriveStations={arriveStations}
        checkedTicketTypes={checkedTicketTypes}
        checkedTrainTypes={checkedTrainTypes}
        checkedDepartStations={checkedDepartStations}
        checkedArriveStations={checkedArriveStations}
        departTimeStart={departTimeStart}
        departTimeEnd={departTimeEnd}
        arriveTimeStart={arriveTimeStart}
        arriveTimeEnd={arriveTimeEnd}
        {...bottomCbs}
      />
    </div>
  );
}
export default connect(
  state => state,
  dispatch => ({ dispatch })
)(App);
