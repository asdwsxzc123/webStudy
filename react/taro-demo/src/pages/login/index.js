import Taro, { useCallback, useRef } from "@tarojs/taro";
import PropTypes from "prop-types";
import { connect } from "@tarojs/redux";
import { View, Input, Button, Text } from "@tarojs/components";
import { showToast } from "../../utils/util";
import "./index.scss";

const Login = (props) => {
  const {
    sending,
    smsTime,
    mobile,
    code,
    erroMessage,
    actionSave,
    actionLogin,
    actionSendSms,
    actionSendSmsVoice,
  } = props;

  const setIntervalTimeIdRef = useRef(null);

  const getMobile = useCallback(
    (event) => {
      actionSave({
        mobile: event.target.value,
      });
    },
    [actionSave]
  );
  const getCode = useCallback(
    (event) => {
      actionSave({
        code: event.target.value,
      });
    },
    [actionSave]
  );
  const setIntervalTime = useCallback(() => {
    clearInterval(setIntervalTimeIdRef.current);
    let numConst = 30;
    setIntervalTimeIdRef.current = setInterval(() => {
      numConst--;
      actionSave({ sending: 1, smsTime: numConst });

      if (numConst == 0 || (erroMessage && erroMessage != "")) {
        clearInterval(setIntervalTimeIdRef.current);
        actionSave({ sending: 2, erroMessage: "", smsTime: 30 });
      }
    }, 1000);
  }, [actionSave, erroMessage]);

  const login = useCallback(() => {
    if (mobile == "" || mobile.length != 11 || code == "" || code.length != 4) {
      showToast("请输入有效的手机号或输入有效验证码！");
      return false;
    }
    actionLogin();
    showToast();
  }, [actionLogin, code, mobile]);
  const sendSms = useCallback(() => {
    if (mobile == "" || mobile.length != 11) {
      showToast("请输入有效的手机号！");
      return false;
    }

    actionSendSms().then(() => {
      setIntervalTime();
      if (erroMessage && erroMessage != "") {
        clearInterval(setIntervalTimeIdRef.current);
        showToast(erroMessage);
      }
    });
  }, [actionSendSms, erroMessage, mobile, setIntervalTime]);
  const getVoiceCode = useCallback(() => {}, []);
  return (
    <View className="login-page" id="login-page">
      <View className="title">您好，请登录</View>
      <View className="title-des">新用户注册即享18天会员98元</View>
      <View className="bgtopWrap">
        <View className="loginWrap">
          <View className="inpuWrapMpblie">
            <Input
              type="number"
              name="mobile"
              maxLength="11"
              placeholder="请输入手机号"
              value={mobile}
              onInput={getMobile}
            />
          </View>
          <View className="inpuWrapNumber">
            <Input
              type="number"
              name="code"
              maxLength="4"
              placeholder="请输入验证码"
              value={code}
              onInput={getCode}
            />
            {sending == 2 && (
              <View className="numberWrap" onClick={sendSms}>
                重新获取
              </View>
            )}
            {sending == 1 && (
              <View className="numberWrap">{`${smsTime}秒后重发`}</View>
            )}
            {sending == 0 && (
              <View className="numberWrap" onClick={sendSms}>
                获取验证码
              </View>
            )}
          </View>
          <Button className="button" onClick={login}>
            登录
          </Button>
          <View className="see-des" onClick={getVoiceCode}>
            收不到短信？
            <Text>使用语音验证码</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
Login.config = {
  navigationBarTitleText: "登录",
};
export default connect(
  ({ login }) => ({ ...login }),
  (dispatch) => ({
    actionSave(payload) {
      return dispatch({ type: "login/save", payload });
    },
    actionLogin() {
      return dispatch({ type: "login/login" });
    },
    actionSendSms() {
      return dispatch({ type: "login/sendSms" });
    },
    actionSendSmsVoice() {
      return dispatch({ type: "login/sendSmsVoice" });
    },
  })
)(Login);
