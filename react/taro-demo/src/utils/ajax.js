import Taro from "@tarojs/taro";
import { baseUrl, noConsole } from "../config";

const request_data = {
  platform: "wap",
  rent_mode: 2,
};
const request = (options) => {
  const { data: params = {}, url, method } = options;
  console.log(options);
  if (!noConsole) {
    console.log(
      `${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(
        params
      )}`
    );
  }
  return Taro.request({
    url: baseUrl + url,
    data: {
      ...request_data,
      ...params,
    },
    header: {
      "Content-Type": "application/json",
    },
    method: method.toUpperCase(),
  }).then((res) => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (!noConsole) {
        console.log(
          `${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,
          data
        );
      }
      if (data.status !== "ok") {
        Taro.showToast({
          title: `${data.error.message}~` || data.error.code,
          icon: "none",
          mask: true,
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
};
export const get = (url, data = {}) => {
  return request({ method: "GET", data, url });
};
export const post = (url, data = {}) => {
  return request({ method: "POST", data, url });
};
export const del = (url, data = {}) => {
  return request({ method: "DELETE", data, url });
};
