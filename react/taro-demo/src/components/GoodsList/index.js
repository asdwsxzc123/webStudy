import Taro, { useCallback } from "@tarojs/taro";
import { View } from "@tarojs/components";
import PropTypes from "prop-types";
import Good from "./Good";
import { DETAIL_PATH } from "../../constants/path";
import "./index.scss";

const GoodsList = (props) => {
  const { list, loading } = props;
  const gotoDetail = useCallback((id) => {
    Taro.navigateTo({
      url: `${DETAIL_PATH}?id=${id}`,
    });
  }, []);
  return (
    <View className="goods-list-container">
      {list.length > 0 ? (
        <View className="goods-ul">
          {list.map((item, index) => (
            <Good
              {...item}
              index={index}
              key={item.id}
              gotoDetail={gotoDetail}
            />
          ))}
        </View>
      ) : null}
      {loading && (
        <View className="loadMoreGif">
          <View className="zan-loading" />
          <View className="text">加载中...</View>
        </View>
      )}
    </View>
  );
};
GoodsList.propTypes = {
  list: PropTypes.array,
  loading: PropTypes.bool,
};
GoodsList.defaultProps = {
  list: [],
};
export default GoodsList;
