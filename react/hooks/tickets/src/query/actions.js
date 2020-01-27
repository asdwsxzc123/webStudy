import { ORDER_DEPART, ORDER_DURATION } from "./constant";
import { h0 } from "../common/fp";
export const ACTION_SET_FROM = "SET_FROM";
export const ACTION_SET_TO = "SET_TO";
export const ACTION_SET_DEPART_DATE = "SET_DEPART_DATE";
export const ACTION_SET_HIGH_SPEED = "SET_HIGH_SPEED";
export const ACTION_SET_TRAIN_LIST = "SET_TRAIN_LIST";
export const ACTION_SET_ORDER_TYPE = "SET_ORDER_TYPE";
export const ACTION_SET_ONLY_TICKETS = "SET_ONLY_TICKETS";
export const ACTION_SET_TICKET_TYPES = "SET_TICKET_TYPES";
export const ACTION_SET_CHECKED_TICKET_TYPES = "SET_CHECKED_TICKET_TYPES";
export const ACTION_SET_TRAIN_TYPES = "SET_TRAIN_TYPES";
export const ACTION_SET_CHECKED_TRAIN_TYPES = "SET_CHECKED_TRAIN_TYPES";
export const ACTION_SET_DEPART_STATIONS = "SET_DEPART_STATIONS";
export const ACTION_SET_CHECKED_DEPART_STATIONS = "SET_CHECKED_DEPART_STATIONS";
export const ACTION_SET_ARRIVE_STATIONS = "SET_ARRIVE_STATIONS";
export const ACTION_SET_CHECKED_ARRIVE_STATIONS = "SET_CHECKED_ARRIVE_STATIONS";
export const ACTION_SET_DEPART_TIME_START = "SET_DEPART_TIME_START";
export const ACTION_SET_DEPART_TIME_END = "SET_DEPART_TIME_END";
export const ACTION_SET_ARRIVE_TIME_START = "SET_ARRIVE_TIME_START";
export const ACTION_SET_ARRIVE_TIME_END = "SET_ARRIVE_TIME_END";
export const ACTION_SET_IS_FILTERS_VISIBLE = "SET_IS_FILTERS_VISIBLE";
export const ACTION_SET_SEARCH_PARSED = "SET_SEARCH_PARSED";

export function setFrom(from) {
  return {
    type: ACTION_SET_FROM,
    paylaod: from
  };
}
export function setTo(to) {
  return {
    type: ACTION_SET_TO,
    paylaod: to
  };
}
export function setDepartDate(departDate) {
  return {
    type: ACTION_SET_DEPART_DATE,
    paylaod: departDate
  };
}
export function setHighSpeed(highSpeed) {
  return {
    type: ACTION_SET_HIGH_SPEED,
    paylaod: highSpeed
  };
}
export function toggleHighSpeed() {
  return (dispatch, getState) => {
    const { highSpeed } = getState();
    dispatch(setHighSpeed(!highSpeed));
  };
}
export function setTrainList(trainList) {
  return {
    type: ACTION_SET_TRAIN_LIST,
    paylaod: trainList
  };
}
export function toggleOrderType() {
  return (dispatch, getState) => {
    const { orderType } = getState();
    if (orderType === ORDER_DEPART) {
      dispatch({
        type: ACTION_SET_ORDER_TYPE,
        paylaod: ORDER_DURATION
      });
    } else {
      dispatch({
        type: ACTION_SET_ORDER_TYPE,
        paylaod: ORDER_DEPART
      });
    }
  };
}
export function toggleOnlyTickets() {
  return (dispatch, getState) => {
    const { onlyTickets } = getState();
    dispatch({
      type: ACTION_SET_ONLY_TICKETS,
      paylaod: !onlyTickets
    });
  };
}
export function setTicketTypes(ticketTypes) {
  return {
    type: ACTION_SET_TICKET_TYPES,
    paylaod: ticketTypes
  };
}
export function setCheckedTicketTypes(checkedTicketTypes) {
  return {
    type: ACTION_SET_CHECKED_TICKET_TYPES,
    paylaod: checkedTicketTypes
  };
}
export function setTrainTypes(trainTypes) {
  return {
    type: ACTION_SET_TRAIN_TYPES,
    paylaod: trainTypes
  };
}
export function setCheckedTrainTypes(checkedTrainTypes) {
  return {
    type: ACTION_SET_CHECKED_TRAIN_TYPES,
    paylaod: checkedTrainTypes
  };
}
export function setDepartStations(departStations) {
  return {
    type: ACTION_SET_DEPART_STATIONS,
    paylaod: departStations
  };
}
export function setCheckedDepartStations(checkedDepartStations) {
  return {
    type: ACTION_SET_CHECKED_DEPART_STATIONS,
    paylaod: checkedDepartStations
  };
}
export function setArriveStations(arriveStations) {
  return {
    type: ACTION_SET_ARRIVE_STATIONS,
    paylaod: arriveStations
  };
}
export function setCheckedArriveStations(checkedArriveStations) {
  return {
    type: ACTION_SET_CHECKED_ARRIVE_STATIONS,
    paylaod: checkedArriveStations
  };
}
export function setDepartTimeStart(departTimeStart) {
  return {
    type: ACTION_SET_DEPART_TIME_START,
    paylaod: departTimeStart
  };
}
export function setDepartTimeEnd(departTimeEnd) {
  return {
    type: ACTION_SET_DEPART_TIME_END,
    paylaod: departTimeEnd
  };
}
export function setArriveTimeStart(arriveTimeStart) {
  return {
    type: ACTION_SET_ARRIVE_TIME_START,
    paylaod: arriveTimeStart
  };
}
export function setArriveTimeEnd(arriveTimeEnd) {
  return {
    type: ACTION_SET_ARRIVE_TIME_END,
    paylaod: arriveTimeEnd
  };
}
export function toggleIsFiltersVisible() {
  return (dispatch, getState) => {
    const { isFiltersVisible } = getState();
    dispatch({
      type: ACTION_SET_ONLY_TICKETS,
      paylaod: !isFiltersVisible
    });
  };
}
export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    paylaod: searchParsed
  };
}

export function nextDate() {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(departDate + 86400 * 1000));
  };
}
export function prevDate() {
  return (dispatch, getState) => {
    const { departDate } = getState();
    dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
  };
}
