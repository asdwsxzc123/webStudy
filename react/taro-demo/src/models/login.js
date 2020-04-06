import Taro from "@tarojs/taro";
import * as loginServices from "../services/login";
import { INIT_INFO } from "../constants/userinfo";

export default {
  namespace: "login",
  state: {
    code: "",
    ...INIT_INFO,
    invitation_code_from: "",
    smsText: "发送验证码",
    sending: 0,
    smsTime: 30,
    type: 4, // 1微信 2QQ 3新浪 4.微信公众号 5.支付宝生活号 6.京东 7.返利
  },
  effects: {
    *login(_, { call, select, put }) {
      const { code, mobile } = yield select(({ login }) => login);
      const { status, data } = yield call(loginServices.login, {
        code,
        mobile,
      });
      if (status === "ok") {
        const userInfo = {
          access_token: data.access_token,
          invitation_code: data.invitation_code,
          mobile: data.mobile,
          nickname: data.nickname,
          new_user: data.new_user,
          is_has_buy_card: data.is_has_buy_card,
          erroMessage: "",
        };
        Taro.setStorageSync("user_info", userInfo);
        Taro.setStorageSync("access_token", data.access_token);

        yield put({
          type: "common/save",
          payload: {
            ...userInfo,
            code: "",
          },
        });
        yield put({
          type: "save",
          payload: {
            ...userInfo,
            code: "",
          },
        });

        Taro.showToast({
          title: "登录成功，欢迎回来～～～",
          icon: "none",
        });

        setTimeout(() => {
          Taro.navigateBack();
        }, 1000);
      }
    },
    *sendSms(_, { call, put, select }) {
      const { mobile } = yield select(({ login }) => login);
      const { status, error } = yield call(loginServices.sendSms, { mobile });
      if (status === "ok") {
        yield put({ type: "save", payload: { sending: 1, erroMessage: "" } });
      } else {
        yield put({
          type: "save",
          payload: { sending: 2, erroMessage: error && error.message },
        });
      }
    },
    *sendSmsVoice(_, { call, put, select }) {
      const { mobile } = yield select((state) => state.login);
      const res = yield call(loginServices.getSmsVoice, { mobile });
      if (res.status == "ok") {
        yield put({ type: "save", payload: { sending: 1, erroMessage: "" } });
      } else {
        yield put({
          type: "save",
          payload: { sending: 2, erroMessage: res.error && res.error.message },
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
