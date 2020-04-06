import * as homeService from "../../../services/homeService";

export default {
  namespace: "home",
  state: {
    banner: [],
    brands: [],
    products_list: [],
    page: 1,
  },
  effects: {
    *fetchHome(_, { call, put }) {
      const { status, data } = yield call(homeService.homepage, {});
      if (status === "ok") {
        yield put({
          type: "save",
          payload: {
            banner: data.banner,
            brands: data.brands,
          },
        });
      }
    },
    *fetchProduct(_, { call, put, select }) {
      const { page, products_list } = yield select(({ home }) => home);
      const { status, data } = yield call(homeService.product, {
        page,
        mode: 1,
        type: 0,
        filter: "sort:recomm|c:330602",
      });
      if (status === "ok") {
        yield put({
          type: "save",
          payload: {
            products_list:
              page > 1 ? [...products_list, ...data.rows] : data.rows,
          },
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
