import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import "./index.scss";

const Message = () => {
  return (
    <View className="message-page">
      <Image
        mode="widthFix"
        src="http://static-r.msparis.com/uploads/8/a/8af1e11caa2c7dc29894777852d50eb3.png"
      />
    </View>
  );
};
Message.config = {
  navigationBarTitleText: "系统消息",
};
export default Message;
