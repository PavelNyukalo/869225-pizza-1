/** Моки-данные */
import misc from "@/static/misc.json";

/** Вспомогательные функции */
import { normalizeData, addCount, addFullPrice } from "@/common/helpers.js";

/** Типы для нормализации */
import { EXTRA_PRODUCTS_TYPES } from "@/common/constants.js";

export const CART = "cart";

export const Actions = {};

export const Mutations = {
  AddExtraProduct: "addExtraProduct",
  RemoveExtraProduct: "removeExtraProduct",
  AddPizzaInCart: "addPizzaInCart",
  AddPizza: "addPizza",
  RemovePizza: "removePizza",
  DeletePizza: "deletePizza",
  UpdatePizza: "updatePizza",
};

export const Getters = {
  FullCartPrice: "fullCartPrice",
};

const addCountAndFullPrice = (item) => {
  item.count++;
  item.fullPrice += item.price;
};

const removeCountAndFullPrice = (item) => {
  item.count--;
  item.fullPrice -= item.price;
};

const sumPrice = (array) => {
  return array.reduce((sum, current) => sum + current.fullPrice, 0);
};

export default {
  namespaced: true,
  state: {
    selectedProducts: [],
    extraProduct: [
      ...misc
        .map((item) => normalizeData(item, EXTRA_PRODUCTS_TYPES))
        .map((item) => addCount(item))
        .map((item) => addFullPrice(item)),
    ],
  },
  actions: {},
  mutations: {
    [Mutations.AddExtraProduct]: (state, payload) => {
      const product = state.extraProduct.find(
        (product) => product.type === payload
      );
      addCountAndFullPrice(product);
    },

    [Mutations.RemoveExtraProduct]: (state, payload) => {
      const product = state.extraProduct.find(
        (product) => product.type === payload
      );
      removeCountAndFullPrice(product);
    },

    [Mutations.AddPizzaInCart]: (state, payload) => {
      const index = state.selectedProducts.push(addFullPrice(payload));
      const addedPizza = state.selectedProducts[index - 1];
      addCountAndFullPrice(addedPizza);
    },

    [Mutations.AddPizza]: (state, payload) => {
      const pizza = state.selectedProducts[payload];
      addCountAndFullPrice(pizza);
    },

    [Mutations.RemovePizza]: (state, payload) => {
      const pizza = state.selectedProducts[payload];
      removeCountAndFullPrice(pizza);
    },

    [Mutations.DeletePizza]: (state, payload) => {
      state.selectedProducts.splice(payload, 1);
    },

    [Mutations.UpdatePizza]: (state, payload) => {
      state.selectedProducts.splice(payload.index, 1, payload.item);
    },
  },

  getters: {
    [Getters.FullCartPrice]: (state) => {
      const fullPricePizza = sumPrice(state.selectedProducts);

      const fullPriceExtraProduct = sumPrice(state.extraProduct);
      const sum = fullPricePizza + fullPriceExtraProduct;
      return String(sum).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");
    },
  },
};
