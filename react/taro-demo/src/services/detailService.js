import { get } from "../utils/ajax";
import { PRODUCT } from "./api";

export const getProductInfo = (params) => {
  return get(PRODUCT, params);
};
