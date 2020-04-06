import { get } from "../utils/ajax";
import { HOMEPAGE, PRODUCT_FILTER } from "./api";

export const homepage = (data) => get(HOMEPAGE, data);

export const product = (data) => get(PRODUCT_FILTER, data);
