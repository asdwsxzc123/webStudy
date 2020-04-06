import Taro from "@tarojs/taro";
import * as addressListServices from "../../../services/addressService";

export default {
  namespace: "addressList",
  state: {
    addressList: [],
    addressId: "",
    cities: [],
    districts: [],
    pickerValue: [0, 0, 0],
    showValue: {
      region_code: "",
      region_name: "",
    },
    contact_name: "",
    contact_mobile: "",
    address_detail: "",
  },

  effects: {
    *getAddressList(_, { call, put, select }) {
      const { access_token } = yield select((state) => state.common);
      const { status, data } = yield call(addressListServices.getAddressList, {
        access_token,
      });
      if (status === "ok") {
        yield put({
          type: "save",
          payload: {
            addressList: data.rows,
          },
        });
      }
    },
    *getDistricts({ payload }, { put, call }) {
      const { status, data } = yield call(
        addressListServices.getDistricts,
        payload
      );
      if (status === "ok") {
        const cities = data.send_cities.send_cities;
        const arr = [[], [], []];
        cities.forEach((item) => {
          arr[0].push({
            key: item.key,
            name: item.name,
          });
        });
        cities[0].cities.forEach((item) => {
          arr[1].push({
            key: item.key,
            name: item.name,
          });
        });
        cities[0].cities[0].regions.forEach((item) => {
          arr[2].push({
            key: item.key,
            name: item.name,
          });
        });
        yield put({
          type: "save",
          payload: {
            cities,
            districts: arr,
          },
        });
      }
    },
    *submit({ payload }, { select, call }) {
      const { access_token } = yield select((state) => state.common);
      const { addressId } = yield select((state) => state.addressUpdate);
      const { status } = yield call(addressListServices.updateAddress, {
        id: addressId && addressId != "" ? addressId : undefined,
        access_token,
        region_code: payload.showValue.region_code,
        region_name: payload.showValue.region_name,
        contact_name: payload.contact_name,
        contact_mobile: payload.contact_mobile,
        address_detail: payload.address_detail,
      });
      if (status === "ok") {
        Taro.showToast({
          title: "保存成功",
          icon: "none",
        });
        setTimeout(() => {
          Taro.navigateBack();
        }, 1000);
      }
    },
    *removeAddress(_, { call, select }) {
      const { access_token } = yield select((state) => state.common);
      const addressId = yield select((state) => state.addressUpdate.addressId);
      const { status } = yield call(addressListServices.removeAddress, {
        id: addressId,
        access_token,
      });
      if (status === "ok") {
        Taro.showToast({
          title: "删除成功",
          icon: "none",
        });
        setTimeout(() => {
          Taro.navigateBack();
        }, 1000);
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
