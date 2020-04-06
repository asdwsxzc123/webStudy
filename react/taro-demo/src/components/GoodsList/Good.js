import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import "./Good.scss";

const Good = (props) => {
  const {
    gotoDetail,
    id,
    cover_image,
    mode_id,
    enabled,
    sale_stock,
    type_id,
    limit_tag,
    name,
    brand,
    market_price,
  } = props;
  return (
    <View className="goods-li" onClick={() => gotoDetail(id)}>
      <View className="pos">
        <View className="img-container">
          <Image
            className="img"
            mode="widthFix"
            src={
              cover_image
                ? `${cover_image}!w750`
                : "http://static-r.msparis.com/uploads/d/1/d1ca37e902e5550ad2c82c721bc216ce.png"
            }
            alt=""
          />
        </View>
        {mode_id == 3 && (enabled != 1 || sale_stock == 0) && (
          <View className="sold-out">
            <View className="sales-end">已售罄</View>
          </View>
        )}
        {enabled && enabled != 0 && enabled != 1 && enabled != 2 && (
          <View className="unable">
            <View className="sales-end">下架</View>
          </View>
        )}
      </View>
      <View className="zan-capsule">
        {type_id == 2 && mode_id == 1 && (
          <View className="zan-capsule__left">VIP</View>
        )}
        {limit_tag && limit_tag != "" && (
          <View className="zan-capsule__center">{limit_tag}</View>
        )}
        {market_price / 100 > 500 && (
          <View className="zan-capsule__right">
            参考价¥
            {market_price / 100}
          </View>
        )}
      </View>
      <Text className="dark text">{brand}</Text>
      <Text className="text">{name}</Text>
    </View>
  );
};
Good.propTypes = {
  id: PropTypes.number,
  cover_image: PropTypes.string,
  mode_id: PropTypes.oneOf([1, 2, 3]),
  enabled: PropTypes.oneOf([1, 0]),
  sale_stock: PropTypes.oneOf([0]),
  type_id: PropTypes.oneOf([1, 2]),
  limit_tag: PropTypes.string,
  name: PropTypes.string,
  brand: PropTypes.string,
  market_price: PropTypes.number,
  gotoDetail: PropTypes.func,
};
export default Good;
