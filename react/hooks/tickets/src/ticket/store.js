import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';
const {
  composeWithDevTools
} = require('redux-devtools-extension');

export default createStore(
  combineReducers(reducers),
  {
    departDate: Date.now(),
    arriveDate: Date.now(),
    departTimeStr: null,
    arriveTimeStr: null,
    departStation: null,
    arriveStation: null,
    trainNumber: null,
    durationStr: null,
    tickets: [],
    isScheduleVisible: false,
    searchParsed: false
  },
  composeWithDevTools(applyMiddleware(thunk))
);
