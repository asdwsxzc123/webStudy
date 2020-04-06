import { get, post } from "../utils/ajax";
import { USER_LOGIN, COMMON_SMS, COMMON_VOICE, COUPON_RECEIVE } from "./api";

export const login = (data) => post(USER_LOGIN, data);
export const getSms = (data) => get(COMMON_SMS, data);
export const getSmsVoice = (data) => get(COMMON_VOICE, data);
export const getReceive = (data) => post(COUPON_RECEIVE, data);
