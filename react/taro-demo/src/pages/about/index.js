import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

const About = () => {
  return (
    <View className="about-page">
      <View>taro</View>
    </View>
  );
};
About.config = {
  navigationBarTitleText: "关于",
};
export default About;
