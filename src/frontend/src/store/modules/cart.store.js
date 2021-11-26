/** Моки-данные */
import misc from "@/static/misc.json";

/** Вспомогательные функции */
import { normalizeData, addCount, addFullPrice } from "@/common/helpers.js";

/** Типы для нормализации */
import { EXTRA_PRODUCTS_TYPES } from "@/common/constants.js";

export const CART = "cart";

export const Actions = {
  LoadMisc: "loadMisc",
};

export const Mutations = {
  SetMisc: "setMisc",
  AddExtraProduct: "addExtraProduct",
  RemoveExtraProduct: "removeExtraProduct",
};

export const Getters = {};

export default {
  namespaced: true,
  state: {
    selectedProduct: [],
    extraProduct: [],
  },
  actions: {
    // fetch misc
    [Actions.LoadMisc]: ({ commit }) => commit(Mutations.SetMisc, misc),
  },
  mutations: {
    [Mutations.SetMisc]: (state, payload) => {
      state.extraProduct = payload
        .map((item) => normalizeData(item, EXTRA_PRODUCTS_TYPES))
        .map((item) => addCount(item))
        .map((item) => addFullPrice(item));
    },
    [Mutations.AddExtraProduct]: (state, payload) => {
      const product = state.extraProduct.find(
        (product) => product.type === payload
      );
      product.count++;
      product.fullPrice += product.price;
    },
    [Mutations.RemoveExtraProduct]: (state, payload) => {
      const product = state.extraProduct.find(
        (product) => product.type === payload
      );
      product.count--;
      product.fullPrice -= product.price;
    },
  },
  getters: {},
};
