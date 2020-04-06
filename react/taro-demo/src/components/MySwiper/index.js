import Taro from "@tarojs/taro";
import PropTypes from "prop-types";
import { Swiper, SwiperItem, Image } from "@tarojs/components";
import "./index.scss";

const MySwiper = (props) => {
  const { banner, home } = props;
  return (
    <Swiper
      className={!home ? "swiper-container" : "swiper"}
      circular
      indicatorDots
      indicatorColor="#999"
      indicatorActiveColor="#bf708f"
      autoplay
    >
      {banner.map((item, index) => (
        <SwiperItem key={index}>
          <Image
            className="img"
            mode="widthFix"
            src={`${item.image_src}!w750`}
          />
        </SwiperItem>
      ))}
    </Swiper>
  );
};
MySwiper.propTypes = {
  banner: PropTypes.array,
  home: PropTypes.bool,
};
MySwiper.defaultProps = {
  banner: [],
  home: false,
};

export default MySwiper;
