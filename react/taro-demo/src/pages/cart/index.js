import Taro, { useCallback, useMemo, useDidShow } from "@tarojs/taro";
import { View, Image, Button, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import ClothingsItem from "../../components/ClothingsItem";
import { goHome, setCartCount } from "../../utils/util";
import "./index.scss";

const Cart = (props) => {
  const { items, actionDeleteClothes } = props;
  const isH5 = Taro.getEnv() === Taro.ENV_TYPE.WEB;
  useDidShow(() => {
    setCartCount(items);
  }, [items]);
  const clothingNumExplain = useCallback(() => {
    const content =
      "“会员每次免费租4件”可付费多租一件，5件封顶；VIP每次免费可租4件会员+1件VIP美衣或者2件会员+2件VIP美衣，或者3件VIP美衣；可付费多租1-2件，5件封顶；";
    Taro.showModal({
      content,
      showCancel: false,
    });
  }, []);
  const onDeleteClothing = useCallback(
    (e) => {
      const id = e.currentTarget.dataset.id;
      Taro.showModal({
        content: "是否删除该美衣？",
      }).then((res) => {
        if (res.confirm) {
          actionDeleteClothes(id);
        }
      });
    },
    [actionDeleteClothes]
  );
  const buy = useCallback(() => {
    Taro.showToast({
      title: "衣袋尚未激活，下单失败～～",
      icon: "none",
    });
  }, []);
  const allPrice = useMemo(() => {
    return items.reduce((count, item) => {
      return count + item.product_price;
    }, 0);
  }, [items]);
  return (
    <View className="cart-page">
      {items.length == 0 ? (
        <View className="empty">
          <Image
            mode="widthFix"
            src="http://static-r.msparis.com/uploads/b/c/bcffdaebb616ab8264f9cfc7ca3e6a4e.png"
          />
          <Button type="primary" className="am-button" onClick={goHome}>
            立即去挑选美衣
          </Button>
        </View>
      ) : (
        <View className="isLogin">
          <Image
            onClick={clothingNumExplain}
            mode="widthFix"
            src="https://static-rs.msparis.com/uploads/1/0/106494e4c47110f6c0e4ea40e15ad446.png"
          />
          <ClothingsItem clothing={items} onDeleteClothing={onDeleteClothing} />
          <View className="bottom-count" style={!isH5 && "bottom:0;"}>
            <View className="fj">
              <View>
                合计：
                <Text className={!items.length ? "disabled price" : "price"}>
                  {allPrice}
                </Text>
              </View>
              <Button
                className="cart-btn"
                onClick={buy}
                disabled={!items.length}
              >
                下单
              </Button>
              <View className="info">
                如有失效美衣，建议删除，以免占用衣袋件数
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};
Cart.config = {
  navigationBarTitleText: "衣袋",
};
export default connect(
  ({ cart }) => ({ ...cart }),
  (dispatch) => ({
    actionDeleteClothes(id) {
      return dispatch({
        type: "cart/deleteClothes",
        payload: {
          id,
        },
      });
    },
  })
)(Cart);
