import Taro from "@tarojs/taro";
import { getProductInfo } from "../services/detailService";
import { setCartCount } from "../utils/util";

export default {
  namespace: "cart",
  state: {
    items: Taro.getStorageSync("items") || [],
  },
  effects: {
    *getProductInfo({ payload }, { call }) {
      const res = yield call(getProductInfo, payload);
      let imgList = [];
      if (res.status == "ok") {
        if (res.data.measurement != null) {
          res.data.measurement = String(res.data.measurement).split("\n");
        } else {
          res.data.measurement = [];
        }
        if (res.data.comments.rows) {
          Array.from(res.data.comments.rows).forEach((item) => {
            switch (item.fit_score) {
              case 1:
                item.fit_text = "尺码偏小";
                break;
              case 2:
                item.fit_text = "尺码正好";
                break;
              case 3:
                item.fit_text = "尺码偏大";
                break;
              default:
                break;
            }
            item.satisfied_score = new Array(item.satisfied_score);
          });
        }
        if (res.data.image) {
          imgList = res.data.image.map((item) => {
            return {
              image_src: item,
            };
          });
        } else {
          imgList = [
            {
              image_src:
                "http://static-r.msparis.com/uploads/d/1/d1ca37e902e5550ad2c82c721bc216ce.png",
            },
          ];
        }
      }
      return { data: res.data, imgList };
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveItems(state, { payload }) {
      Taro.setStorageSync("items", [...state.items, ...payload.items]);
      return { ...state, ...payload };
    },
    deleteClothes(state, { payload }) {
      const { id } = payload;
      const items = state.items.filter((item) => item.product_id != id);
      setCartCount(items);
      // 设置衣袋小红点
      if (items.length > 0) {
        Taro.setStorageSync("items", items);
      } else {
        Taro.removeStorageSync("items");
      }
      return {
        ...state,
        ...{
          items,
        },
      };
    },
    init() {
      Taro.removeStorageSync("items");
      Taro.removeTabBarBadge({
        index: 1,
      });
      return {
        items: [],
      };
    },
  },
};
