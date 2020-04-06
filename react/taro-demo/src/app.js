import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import dva from "./utils/dva";
import models from "./models";
import Home from "./pages/home";
import "./app.less";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
const dvaApp = dva.createApp({
  initialState: {},
  models,
});
const store = dvaApp.getStore();
class App extends Component {
  config = {
    pages: [
      "pages/home/index",
      "pages/login/index",
      "pages/cart/index",
      "pages/detail/index",
      "pages/size/index",
      "pages/user/index",
      "pages/message/index",
      "pages/order/index",
      "pages/addressList/index",
      "pages/addressUpdate/index",
      "pages/couponList/index",
      "pages/about/index",
    ],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "时装衣橱",
      navigationBarTextStyle: "black",
    },
    tabBar: {
      list: [
        {
          pagePath: "pages/home/index",
          text: "首页",
          iconPath: "./images/tab/home.png",
          selectedIconPath: "./images/tab/home-active.png",
        },
        {
          pagePath: "pages/cart/index",
          text: "衣袋",
          iconPath: "./images/tab/cart.png",
          selectedIconPath: "./images/tab/cart-active.png",
        },
        {
          pagePath: "pages/user/index",
          text: "我的",
          iconPath: "./images/tab/user.png",
          selectedIconPath: "./images/tab/user-active.png",
        },
      ],
      color: "#333",
      selectedColor: "#333",
      backgroundColor: "#fff",
      borderStyle: "white",
    },
  };
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
