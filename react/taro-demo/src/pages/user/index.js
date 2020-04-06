import Taro, { useCallback } from "@tarojs/taro";
import { View, Image, Text, Icon } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { checkLogined } from "../../utils/util";
import * as Path from "../../constants/path";
import { INIT_INFO } from "../../constants/userinfo";
import message_img from "../../images/user/message.png";
import avatar_img from "../../images/user/avatar.png";
import coupon_img from "../../images/user/coupon.png";
import about_img from "../../images/user/about.png";
import address_img from "../../images/user/address.png";
import "./index.scss";

const User = (props) => {
  const {
    mobile,
    coupon_number,
    nickname,
    list,
    access_token,
    actionCartInit,
    actionCommonSave,
    actionUserSave,
  } = props;
  const goPage = useCallback(
    (e) => {
      if (e.currentTarget.dataset.url == Path.LOGIN_PATH && access_token) {
        return;
      }
      Taro.navigateTo({
        url: e.currentTarget.dataset.url,
      });
    },
    [access_token]
  );

  const goToPage = useCallback((e) => {
    if (!checkLogined()) {
      return false;
    }
    Taro.navigateTo({
      url: e.currentTarget.dataset.url,
    });
  }, []);
  const outLogin = useCallback(
    (e) => {
      e.stopPropagation();
      if (!access_token) {
        Taro.navigateTo({
          url: Path.LOGIN_PATH,
        });
        return;
      }
      Taro.showModal({
        content: "是否退出当前账号？",
      }).then((res) => {
        if (res.confirm) {
          Taro.removeStorageSync("user_info");
          Taro.removeStorageSync("access_token");
          actionCartInit();
          actionCommonSave(INIT_INFO);
          actionUserSave(INIT_INFO);
        }
      });
    },
    [access_token, actionCartInit, actionCommonSave, actionUserSave]
  );
  return (
    <View className="user-page">
      <View className="not-login">
        <View className="to-login" data-url={Path.LOGIN_PATH} onClick={goPage}>
          <View className="left">
            <View className={mobile ? "name black" : "name "}>
              {nickname || "请登录 >"}
            </View>
            <View>
              <View
                className="msg"
                data-url={Path.MESSAGE_PATH}
                onClick={goToPage}
              >
                <Image mode="widthFix" src={message_img} />
              </View>
              <View className="msg" onClick={outLogin}>
                <Image
                  mode="widthFix"
                  src="http://static-r.msparis.com/uploads/9/a/9a00ce9a5953a6813a03ee3324cbad2a.png"
                />
              </View>
            </View>
          </View>
          <View className="avatar-container">
            <Image className="avatar" src={avatar_img} />
          </View>
        </View>
        <View className="list">
          {list &&
            list.map((item, index) => (
              <View
                className="item"
                key={`module-${index}`}
                data-url={`${Path.ORDER_PATH}?type=${index}`}
                onClick={goToPage}
              >
                <Image mode="widthFix" src={item.img} />
                <Text>{item.txt}</Text>
                {item.num > 0 && <Icon className="num">{item.num}</Icon>}
              </View>
            ))}
        </View>
      </View>
      <View className="login">
        <View className="card">
          <View className="type type0">
            <View className="operation">
              <View className="txt">
                {mobile ? "VIP会员用户" : "您还不是会员"}
              </View>
              {!mobile && (
                <View
                  className="btn"
                  data-url={Path.LOGIN_PATH}
                  onClick={goPage}
                >
                  成为会员
                  <View className="iconfont icon-membership_more" />
                </View>
              )}
            </View>
          </View>
        </View>
        <View
          className="item"
          data-url={Path.ADDRESSLIST_PATH}
          onClick={goToPage}
        >
          <View className="left">
            <Image className="icon-left" src={address_img} />
            <Text>收货地址</Text>
          </View>
          <View className="right">
            {coupon_number && <View className="num">{coupon_number}</View>}
            <View className="iconfont icon-more arrow" />
          </View>
        </View>
        <View
          className="item"
          data-url={Path.COUPONLIST_PATH}
          onClick={goToPage}
        >
          <View className="left">
            <Image className="icon-left" src={coupon_img} />
            <Text>优惠券</Text>
          </View>
          <View className="right">
            {coupon_number && <View className="num">{coupon_number}</View>}
            <View className="iconfont icon-more arrow" />
          </View>
        </View>
        <View className="item" data-url={Path.ABOUT_PATH} onClick={goPage}>
          <View className="left">
            <Image className="icon-left" src={about_img} />
            <Text>关于</Text>
          </View>
          <View className="right">
            <View className="iconfont icon-more arrow" />
          </View>
        </View>
        {/* 流量主广告 */}
        {Taro.getEnv() === Taro.ENV_TYPE.WEAPP && (
          <ad unit-id="adunit-acab7e823a01abbd" />
        )}
      </View>
    </View>
  );
};
User.config = {
  navigationBarTitleText: "我的",
};
export default connect(
  ({ user, common }) => ({
    ...user,
    ...common,
  }),
  (dispatch) => ({
    actionCommonSave(payload) {
      return dispatch({
        type: "common/save",
        payload,
      });
    },
    actionUserSave(payload) {
      return dispatch({
        type: "login/save",
        payload,
      });
    },
    actionCartInit() {
      return dispatch({
        type: "cart/init",
      });
    },
  })
)(User);
