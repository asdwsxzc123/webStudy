import Taro, {
  useRouter,
  useEffect,
  useCallback,
  useState,
} from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, Button, Image } from "@tarojs/components";
import MySwiper from "../../components/MySwiper";
import { checkLogined } from "../../utils/util";
import { HOME_PATH, CART_PATH, SIZE_PATH } from "../../constants/path";
import "./index.scss";

const Cart = (props) => {
  const { actionFetchProductInfo, items, actionSave } = props;
  const [detail, setDetail] = useState({ specifications: [] });
  const [currentChooseId, setCurrentChooseId] = useState(0);
  const [currentChooseName, setCurrentChooseName] = useState("");

  const { specifications } = detail;
  const [imageObj, setImageObj] = useState([]);
  const {
    params: { id },
  } = useRouter();
  const handleInfo = useCallback(
    async (goodId) => {
      const { data, imgList } = await actionFetchProductInfo(goodId);
      Taro.setNavigationBarTitle({
        title: data.name,
      });
      setDetail(data);
      setImageObj(imgList);
    },
    [actionFetchProductInfo]
  );
  const computedStyle = useCallback(
    (item) => {
      let str = "";
      if (item.id == currentChooseId) {
        str = "size on";
      } else {
        str = "size";
      }
      if (item.has_stock != 1) {
        str = "size off";
      }
      return str;
    },
    [currentChooseId]
  );
  const chooseSize = useCallback(
    (e) => {
      const { has_stock, id: goodsId, name } = e.currentTarget.dataset;
      // 只有has_stock =1 才可以选择尺码,其他都是disable
      if (has_stock == 1) {
        // 如果点击当前，则2次点击清空
        if (goodsId === currentChooseId) {
          setCurrentChooseId(0);
          setCurrentChooseName("");
        } else {
          // 首次点击，赋值为当前id
          setCurrentChooseId(goodsId);
          setCurrentChooseName(name);
        }
      }
    },
    [currentChooseId]
  );
  const goToPage = useCallback((e) => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      Taro.navigateTo({
        url: e.currentTarget.dataset.url,
      });
    } else {
      Taro.switchTab({
        url: e.currentTarget.dataset.url,
      });
    }
  }, []);

  const makePhoneCall = useCallback(() => {
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      window.location.href = "tel:123456";
    } else {
      Taro.makePhoneCall({
        phoneNumber: "123456",
      });
    }
  }, []);

  const showClothesDetail = useCallback(() => {
    return (
      (detail.measurement && detail.measurement.length > 0) ||
      (detail.size_suggestion && detail.size_suggestion != null) ||
      (detail.fabric && detail.fabric != null)
    );
  }, [detail.fabric, detail.measurement, detail.size_suggestion]);

  const join = useCallback(() => {
    if (!checkLogined()) return false;
    if (
      detail.mode_id == 3 &&
      (detail.enabled != 1 || detail.sale_stock == 0)
    ) {
      Taro.showToast({
        title: "商品已售罄",
        icon: "none",
      });
      return;
    }
    if (!currentChooseId) {
      Taro.showToast({
        title: "请选择尺码",
        icon: "none",
      });
      return;
    }
    if (detail.enabled == 1) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.product_id == detail.product_master_id) {
          Taro.showToast({
            title: "衣袋已存在该美衣~~",
            icon: "none",
          });
          return;
        }
      }
      actionSave({
        items: [
          ...items,
          {
            brand: detail.brand,
            images: detail.image[0],
            name: detail.name,
            product_id: detail.product_master_id,
            product_price: detail.sale_price,
            specification: currentChooseName,
            spu: currentChooseId,
            type: detail.type_id,
          },
        ],
      });
      Taro.showToast({
        title: "加入衣袋成功",
      });
    }
  }, [
    actionSave,
    currentChooseId,
    currentChooseName,
    detail.brand,
    detail.enabled,
    detail.image,
    detail.market_price,
    detail.mode_id,
    detail.name,
    detail.product_master_id,
    detail.sale_stock,
    detail.type_id,
    items,
  ]);

  // init
  useEffect(() => {
    handleInfo(id);
  }, [id, handleInfo]);

  return (
    <View className="detail-page">
      <View className="image-box-wrap">
        <View className="image-box clearfix">
          <MySwiper banner={imageObj} />
          <View className="share-btn">
            <Button openType="share" />
          </View>
        </View>
        {detail.mode_id &&
          detail.mode_id == 3 &&
          (detail.enabled != 1 || detail.sale_stock == 0) && (
            <View className="sold-out">
              <View className="sales-end">已售罄</View>
            </View>
          )}

        {detail.enabled &&
          detail.enabled != 0 &&
          detail.enabled != 1 &&
          detail.enabled != 2 && (
            <View className="unable">
              <View className="sales-end">下架</View>
            </View>
          )}
      </View>
      {/* -- 商品信息 -- */}
      <View className="container">
        <View className="info-business-card">
          <View className="name">{detail.brand}</View>
          {detail.market_price / 100 > 500 && (
            <View className="model">参考价 ¥{detail.market_price / 100}</View>
          )}
        </View>
        <View className="product_name">
          {detail.type_id == 2 && detail.mode_id == 1 && <View>VIP</View>}
          {detail.limit_tag && detail.limit_tag != "" && (
            <View className="zan-capsule__center">{detail.limit_tag}</View>
          )}
          {detail.name}
        </View>
        <View className="code">{detail.product_spu}</View>
        <View className="info-size">
          {specifications &&
            specifications.length > 0 &&
            specifications.map((spe, speIndex) => {
              return (
                <View key={`speci-${speIndex}`}>
                  {spe &&
                    spe.options &&
                    spe.options.map((item, index) => (
                      <View key={`size-${index}`}>
                        {spe.name == "中码" ? (
                          <View
                            className={computedStyle(item)}
                            data-has_stock={item.has_stock}
                            data-id={item.id}
                            data-name={item.name}
                            onClick={chooseSize}
                          >
                            {item.name == "均码" ? (
                              <View>均码</View>
                            ) : (
                              <View>{`${spe.name}${item.value}号`}</View>
                            )}
                          </View>
                        ) : (
                          <View
                            className={computedStyle(item)}
                            data-has_stock={item.has_stock}
                            data-id={item.id}
                            onClick={chooseSize}
                          >
                            <View className="double">
                              {`${spe.name}${item.name}号`}
                            </View>
                            <View className="double font">
                              {`中码${item.value}号`}
                            </View>
                          </View>
                        )}
                      </View>
                    ))}
                </View>
              );
            })}
        </View>

        <View
          className="proudct-size-line"
          data-url={SIZE_PATH}
          onClick={goToPage}
        >
          <View className="clearfix">
            <View className="icon-tag" />
            <View className="text">各国尺码转换表</View>
          </View>
        </View>
        {/* 流量主广告 */}
        {Taro.getEnv() === Taro.ENV_TYPE.WEAPP && (
          <ad unit-id="adunit-8b7bfc0fa927b307" />
        )}
        {/* 买手点评 */}
        <View>
          {detail.designer_comment && detail.designer_comment != null && (
            <View className="goods-info">
              <View className="chapter-head">买手点评</View>
              <View className="fj">
                <Image
                  className="fj-img"
                  src={detail.buyer_Info.avatar}
                  alt=""
                />
                <View>
                  <View className="fj-name">{detail.buyer_Info.nickname}</View>
                  <View className="fj-tag">女神派时尚买手</View>
                  <View className="fj-info">{detail.designer_comment}</View>
                </View>
              </View>
            </View>
          )}
        </View>
        {/* 美衣详情  */}
        {showClothesDetail() && (
          <View className="goods-info">
            <View className="chapter-head">美衣详情</View>
            {detail.measurement != "" && (
              <View className="detail-info">
                <View className="head">
                  <Image src={require("../../images/icon/icon32.png")} alt="" />
                  平铺测量
                </View>
                {detail.measurement &&
                  detail.measurement.map((item, index) => (
                    <View className="block" key={index}>
                      {item}
                    </View>
                  ))}
              </View>
            )}
            {detail.size_suggestion && detail.size_suggestion != null && (
              <View className="detail-info">
                <View className="head">
                  <Image alt="" src={require("../../images/icon/icon33.png")} />
                  尺码建议
                </View>
                <View>{detail.size_suggestion}</View>
              </View>
            )}
            {detail.fabric && detail.fabric != null && (
              <View className="detail-info">
                <View className="head">
                  <Image alt="" src={require("../../images/icon/icon34.png")} />
                  面料成分
                </View>
                {detail.thickness != null && (
                  <View>
                    面料：
                    {detail.fabric}({detail.thickness})
                  </View>
                )}
                {detail.thickness == null && (
                  <View>
                    面料：
                    {detail.fabric}
                  </View>
                )}
              </View>
            )}
          </View>
        )}
        {/* 优质评价 */}
        <View className="goods-info">
          <View className="chapter-head">
            优质评价（
            {detail.comments && detail.comments.total}）
          </View>
          {detail.comments && detail.comments.total == 0 && (
            <View className="text-center">———— 暂无优质评价 ————</View>
          )}
          {detail.comments &&
            detail.comments.rows &&
            detail.comments.rows.map((item, index) => (
              <View className="fj" key={index}>
                <Image className="fj-img" alt="" src={item.user_pic} />
                <View>
                  <View className="fj-name font26">{item.nickname}</View>
                  <View className="fj-tag">
                    {/* <Commentbar progress={item.satisfied_score} /> */}
                    {item.fit_text}
                  </View>
                  <View className="fj-info">{item.comment}</View>
                  <View className="comment-img">
                    {item.images &&
                      item.images.map((sub1, subIndex1) => (
                        <Image
                          key={subIndex1}
                          className="goods-img"
                          mode="widthFix"
                          src={sub1.image_url}
                        />
                      ))}
                  </View>
                </View>
              </View>
            ))}
        </View>
        {/* 品牌介绍 */}
        {detail.brand && detail.brand != null && (
          <View className="goods-info">
            <View className="chapter-head">品牌介绍</View>
            <View className="introduce">
              <View className="b">{detail.brand}</View>
              {/*  <image src="{{detail.brand_logo}}"  alt="" /> */}
              <View className="iconfont icon-more" />
            </View>
            {detail.brand_desc != null && (
              <View className="light">
                &nbsp;&nbsp;&nbsp;&nbsp;
                {detail.brand_desc}
              </View>
            )}
          </View>
        )}
        {/* 服务说明 */}
        <View className="goods-info">
          <View className="chapter-head">
            服务说明
            {/* <image className="icon"  alt="" src="../../images/icons/icon35.png" /> */}
          </View>
          <View className="server-ul">
            <View className="server-list">
              <Image
                mode="widthFix"
                src="http://static-r.msparis.com/uploads/d/6/d646e479e328e9f370462b51fb841e70.png"
                alt=""
              />
              <View>每次4件</View>
              <View>无限换穿</View>
            </View>
            <View className="server-list">
              <Image
                mode="widthFix"
                src="http://static-r.msparis.com/uploads/1/3/137d9963d13a053a6a81784af1256aa9.png"
                alt=""
              />
              <View>五星洗护</View>
              <View>往返包邮</View>
            </View>
            <View className="server-list">
              <Image
                mode="widthFix"
                src="http://static-r.msparis.com/uploads/c/0/c0367921e38cc7fd33f63897b18a86ef.png"
                alt=""
              />
              <View>APP一键还衣</View>
              <View>快递上门</View>
            </View>
          </View>
        </View>
      </View>
      {/* 底部操作栏 */}
      <View className="detail-bottom-btns">
        <View className="nav" data-url={HOME_PATH} onClick={goToPage}>
          <Image
            className="nav-img"
            src={require("../../images/tab/home.png")}
            alt=""
          />
          首页
        </View>
        <View className="nav" onClick={makePhoneCall}>
          <Image
            className="nav-img"
            src={require("../../images/icon/customerservice.png")}
            alt=""
          />
          客服
        </View>
        <View className="nav" data-url={CART_PATH} onClick={goToPage}>
          <Image
            className="nav-img"
            src={require("../../images/tab/cart.png")}
            alt=""
          />
          衣袋
          {items.length > 0 && (
            <View className="zan-badge__count">{items.length}</View>
          )}
        </View>
        <View
          className={currentChooseId == "" ? "join join-disabled" : "join"}
          onClick={join}
        >
          加入衣袋
        </View>
      </View>
    </View>
  );
};
Cart.config = {
  navigationBarTitleText: "",
};
Cart.propTypes = {
  // show: PropTypes.bool.isRequired,
};

export default connect(
  ({ cart }) => ({
    ...cart,
  }),
  (dispatch) => ({
    actionFetchProductInfo(id) {
      return dispatch({
        type: "cart/getProductInfo",
        payload: { id },
      });
    },
    actionSave(payload) {
      return dispatch({
        type: "cart/saveItems",
        payload,
      });
    },
  })
)(Cart);
