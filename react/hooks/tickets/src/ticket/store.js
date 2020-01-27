import { createStore, combineReducers, applyMiddleware } from "redux";

import reducers from "./reducers";
import thunk from "redux-thunk";
const { composeWithDevTools } = require("redux-devtools-extension");

export default createStore(
  combineReducers(reducers),
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
