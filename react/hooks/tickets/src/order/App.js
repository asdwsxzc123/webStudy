import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import URI from 'urijs';
import dayjs from 'dayjs';
import { onBack } from '../common/fp';

import Header from '../common/Header';
import Detail from '../common/Detail';
import Menu from './Menu';
import Account from './Account';
import Choose from './Choose';
import Passengers from './Passengers';
import Ticket from './Ticket';
import './App.css';

import {
  setDepartStation,
  setArriveStation,
  setTrainNumber,
  setSeatType,
  setDepartDate,
  setSearchParsed,
  fetchInitial,
  createAdult,
  createChild,
  removePassenger,
  updatePassenger,
  showGenderMenu,
  hideMenu,
  showFollowAdultMenu,
  showTicketTypeMenu
} from './actions';
import { bindActionCreators } from 'redux';

function App(props) {
  const {
    trainNumber,
    departStation,
    arriveStation,
    seatType,
    departDate,
    arriveDate,
    departTimeStr,
    arriveTimeStr,
    durationStr,
    price,
    passengers,
    menu,
    isMenuVisible,
    searchParsed,
    dispatch
  } = props;
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const {
      trainNumber,
      dStation,
      aStation,
      type,
      date
    } = queries;

    dispatch(setDepartStation(dStation));
    dispatch(setArriveStation(aStation));
    dispatch(setTrainNumber(trainNumber));
    dispatch(setSeatType(type));
    dispatch(setDepartDate(dayjs(date).valueOf()));

    dispatch(setSearchParsed(true));
  }, [dispatch]);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }
    const url = new URI('/api/order')
      .setSearch('dStation', departStation)
      .setSearch('aStation', arriveStation)
      .setSearch('type', seatType)
      .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'));

    dispatch(fetchInitial(url));
  }, [
    searchParsed,
    departStation,
    arriveStation,
    seatType,
    departDate,
    dispatch
  ]);
  const passengersCbs = useMemo(() => {
    return bindActionCreators(
      {
        createAdult,
        createChild,
        removePassenger,
        updatePassenger,
        showGenderMenu,
        showFollowAdultMenu,
        showTicketTypeMenu
      },
      dispatch
    );
  }, [dispatch]);

  const menuCbs = useMemo(() => {
    return bindActionCreators(
      {
        hideMenu
      },
      dispatch
    );
  }, [dispatch]);
  const chooseCbs = useMemo(() => {
    return bindActionCreators({ updatePassenger }, dispatch);
  }, [dispatch]);
  if (!searchParsed) return null;
  return (
    <div>
      <div className="header-wrapper">
        <Header title="订单填写" onBack={onBack} />
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
        >
          <span
            className="train-icon"
            style={{
              display: 'block'
            }}
          ></span>
        </Detail>
      </div>
      <Ticket price={price} type={seatType} />
      <Passengers passengers={passengers} {...passengersCbs} />
      {passengers.length > 0 && (
        <Choose passengers={passengers} {...chooseCbs} />
      )}
      <Account length={passengers.length} price={price} />
      <Menu show={isMenuVisible} {...menu} {...menuCbs} />
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
