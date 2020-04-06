import Taro, {
  useEffect,
  useShareAppMessage,
  useReachBottom,
} from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import MySwiper from "../../components/MySwiper";
import GoodsList from "../../components/GoodsList";
import { setCartCount } from "../../utils/util";
import "./index.scss";

const Home = (props) => {
  const {
    items,
    banner,
    brands,
    products_list,
    page,
    loading,
    actionFetchHome,
    actionFetchProduct,
    actionSave,
  } = props;

  useEffect(() => {
    actionFetchHome();
    actionFetchProduct();
    // todo 设置购物车小红点
    setCartCount(items);
  }, [actionFetchHome, actionFetchProduct, items]);

  // 分享
  useShareAppMessage(() => {
    return {
      title: "基于Taro框架开发的时装衣橱",
      path: "/pages/home/index",
    };
  }, []);
  // 到达底部
  useReachBottom(() => {
    actionSave({
      page: page + 1,
    });
    actionFetchProduct();
  });
  return (
    <View className="home-page">
      <MySwiper banner={banner} home />
      <View className="nav-list">
        {brands.map((item, index) => (
          <View className="nav-item" key={index}>
            <Image mode="widthFix" src={item.image_src} />
          </View>
        ))}
      </View>
      {/* 流量主广告 */}
      {Taro.getEnv() === Taro.ENV_TYPE.WEAPP && (
        <ad unit-id="adunit-dc1c0a38156fa412" />
      )}
      <Text className="recommend">为你推荐</Text>
      <GoodsList list={products_list} loading={loading} />
    </View>
  );
};
Home.config = {
  navigationBarTitleText: "首页",
};
export default connect(
  ({ loading, home, cart }) => ({
    ...home,
    items: cart.items,
    loading: loading.effects["home/fetchProduct"],
  }),
  (dispatch) => ({
    actionFetchHome() {
      return dispatch({
        type: "home/fetchHome",
      });
    },
    actionFetchProduct() {
      return dispatch({
        type: "home/fetchProduct",
      });
    },
    actionSave(payload) {
      return dispatch({
        type: "home/save",
        payload,
      });
    },
  })
)(Home);
