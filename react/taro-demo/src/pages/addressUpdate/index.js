import Taro, { useEffect } from "@tarojs/taro";
import { View, Input, Image, Text, Picker } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import "./index.scss";

const AddressList = (props) => {
  const {
    addressId,
    pickerValue,
    showValue,
    contact_name,
    contact_mobile,
    address_detail,
    cities,
    districts,
    actionGetDistricts,
    actionSave,
    actionSubmit,
    actionRemoveAddress,
  } = props;
  useEffect(() => {
    actionGetDistricts();
  }, [actionGetDistricts]);
  // picker选择数据动态渲染
  const onColumnchange = (e) => {
    const { column, value } = e.detail;
    const arr = JSON.parse(JSON.stringify(districts));
    if (column == 0) {
      arr[1] = [];
      arr[2] = [];
      cities[value].cities.forEach((item) => {
        arr[1].push({
          key: item.key,
          name: item.name,
        });
      });
      cities[value].cities[0].regions.forEach((item) => {
        arr[2].push({
          key: item.key,
          name: item.name,
        });
      });
    }
    if (column == 1) {
      arr[2] = [];
      cities[value].cities[0].regions.forEach((item) => {
        arr[2].push({
          key: item.key,
          name: item.name,
        });
      });
    }
    this.props.dispatch({
      type: "addressUpdate/save",
      payload: {
        districts: arr,
      },
    });
  };
  // picker赋值
  const onChange = (e) => {
    const { value } = e.detail;
    const detail = cities[value[0]].cities[value[1]].regions[value[2]];
    actionSave({
      pickerValue: value,
      showValue: {
        region_code: detail.key,
        region_name: detail.fullname,
      },
    });
  };
  const update = (event) => {
    const { value, id } = event.target;
    actionSave({ [id]: value });
  };
  // 保存提交
  const submit = () => {
    if (contact_name === "") {
      Taro.showToast({
        title: "请输入收货人",
        icon: "none",
      });
      return;
    }
    if (!/^1[234578]\d{9}$/.test(contact_mobile)) {
      Taro.showToast({
        title: "手机号格式不正确",
        icon: "none",
      });
      return;
    }
    if (showValue.region_name === "") {
      Taro.showToast({
        title: "请选择收货地址",
        icon: "none",
      });
      return;
    }
    if (address_detail === "") {
      Taro.showToast({
        title: "请输入详细地址",
        icon: "none",
      });
      return;
    }
    actionSubmit({
      showValue,
      contact_name,
      contact_mobile,
      address_detail,
    });
  };
  // 删除地址
  const del = () => {
    Taro.showModal({
      content: "是否删除该地址？",
    }).then((res) => {
      if (res.confirm) {
        actionRemoveAddress();
      }
    });
  };
  return (
    <View className="addressUpdate-page">
      <View className="head">
        {addressId && addressId !== "" ? "编辑地址" : "添加地址"}
      </View>
      <View className="form">
        <Input
          placeholder="收件人"
          id="contact_name"
          value={contact_name}
          onInput={update}
        />
        <Input
          type="number"
          maxLength="11"
          placeholder="手机号码"
          id="contact_mobile"
          value={contact_mobile}
          onInput={update}
        />
        <Picker
          className="picker"
          mode="multiSelector"
          rangeKey="name"
          range={districts}
          onColumnchange={onColumnchange}
          onChange={onChange}
          value={pickerValue}
        >
          {showValue.region_name == "" ? (
            <View className="label">
              省、市、区
              <View className="iconfont icon-more arrow" />
            </View>
          ) : (
            <View className="picker-item">
              {showValue.region_name}
              <View className="iconfont icon-more arrow" />
            </View>
          )}
        </Picker>
        <Input
          placeholder="详细地址"
          id="address_detail"
          value={address_detail}
          onInput={update}
        />
      </View>
      <View className="bottom-btn">
        {addressId && addressId !== "" && (
          <View className="confirm remove" onClick={del}>
            <Image
              mode="widthFix"
              src={require("../../images/icon/times.png")}
            />
            <Text>删除</Text>
          </View>
        )}
        <View className="confirm" onClick={submit}>
          <Image mode="widthFix" src={require("../../images/icon/check.png")} />
          <Text>保存</Text>
        </View>
      </View>
    </View>
  );
};
AddressList.propTypes = {
  // show: PropTypes.bool.isRequired,
};
export default connect(
  ({ addressList }) => ({ ...addressList }),
  (dispatch) => ({
    actionGetDistricts() {
      return dispatch({
        type: "addressList/getDistricts",
        payload: {
          send_cities: 0,
        },
      });
    },
    actionSave(payload) {
      return dispatch({
        type: "addressList/save",
        payload,
      });
    },
    actionSubmit(payload) {
      return dispatch({
        type: "addressList/submit",
        payload,
      });
    },
    actionRemoveAddress() {
      return dispatch({
        type: "addressList/removeAddress",
      });
    },
  })
)(AddressList);
