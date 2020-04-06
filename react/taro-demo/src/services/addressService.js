import { get, post, del } from "../utils/ajax";
import { USER_ADDRESS, COMMON_CONFIGS } from "./api";

export const getAddressList = (data) => get(USER_ADDRESS, data);
export const getDistricts = (data) => get(COMMON_CONFIGS, data);
export const updateAddress = (data) => post(USER_ADDRESS, data);
export const removeAddress = (data) => del(USER_ADDRESS, data);
