import Taro from "@tarojs/taro";
import { HOME_PATH, LOGIN_PATH } from "../constants/path";

export const goHome = () => {
  if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
    Taro.navigateTo({
      url: HOME_PATH,
    });
  } else {
    Taro.switchTab({
      url: HOME_PATH,
    });
  }
};
export const checkLogined = () => {
  return true;
  if (!Taro.getStorageSync("access_token")) {
    Taro.navigateTo({
      url: LOGIN_PATH,
    });
    return false;
  }
  return true;
};
export const showToast = (text, icon = "none") => {
  Taro.showToast({
    title: text,
    icon,
  });
};
export const setCartCount = (items) => {
  // 设置衣袋小红点
  if (items.length > 0) {
    Taro.setTabBarBadge({
      index: 1,
      text: String(items.length),
    });
  } else {
    Taro.removeTabBarBadge({
      index: 1,
    });
  }
};
