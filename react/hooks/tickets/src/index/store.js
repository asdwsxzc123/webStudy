import { createStore, combineReducers, applyMiddleware } from "redux";

import reducers from "./reducers";
import thunk from "redux-thunk";
// 引入工具插件
const { composeWithDevTools } = require("redux-devtools-extension");
// 创建 store 时，传入参数
export default createStore(
  combineReducers(reducers),
  {
    from: "北京",
    to: "上海",
    isCitySelectVisible: false,
    currentSelectingLeftCity: false,
    cityData: null,
    isLoadingCityData: false,
    isDateSelectorVisible: false,
    highSpeed: false
  },
  composeWithDevTools(applyMiddleware(thunk))
);
