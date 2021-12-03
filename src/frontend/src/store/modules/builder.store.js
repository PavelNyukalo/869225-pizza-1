import cloneDeep from "lodash.clonedeep";

/** Моки-данные */
import pizza from "@/static/pizza.json";

/** Вспомогательные функции */
import {
  normalizeData,
  addCount,
  addDefaultChecked,
} from "@/common/helpers.js";

/** Типы для нормализации */
import {
  DOUGH_TYPES,
  INGREDIENTS_TYPES,
  SIZES_TYPES,
  SAUCES_TYPES,
  DEFAULT_CHECKED_TYPE,
} from "@/common/constants.js";

import { COUNT_INGREDIENT } from "@/common/constants";

export const BUILDER = "builder";

const changeDefaultChecked = (stateArray, payloadType) => {
  stateArray.map((item) => (item.defaultChecked = item.type === payloadType));
};

export const Actions = {
  CreatePizza: "createPizza",
};

export const Mutations = {
  SetPizza: "setPizza",
  UpdatePizzaName: "updatePizzaName",
  SelectDough: "selectDough",
  SelectSize: "selectSize",
  SelectSauce: "selectSauce",
  AddIngredient: "addIngredient",
  RemoveIngredient: "removeIngredient",
  AddPriceAndCount: "addPriceAndCount",
  ResetPizza: "resetPizza",
  SetPizzaFromCart: "setPizzaFromCart",
};

export const Getters = {
  FinalPrice: "finalPrice",
};

export default {
  namespaced: true,
  state: {
    dough: [],
    sauces: [],
    ingredients: [],
    sizes: [],

    selectedPizza: {
      name: "",
      dough: {},
      sauce: {},
      ingredients: [],
      size: {},
      price: 0,
      count: 0,
    },
  },
  actions: {
    // fetch pizza
    [Actions.CreatePizza]: ({ commit }) => commit(Mutations.SetPizza, pizza),
  },
  mutations: {
    [Mutations.SetPizza]: (state, payload) => {
      state.dough = payload.dough
        .map((dough) => normalizeData(dough, DOUGH_TYPES))
        .map((dough) => addDefaultChecked(dough, DEFAULT_CHECKED_TYPE.Dough));
      state.selectedPizza.dough = state.dough.find(
        (item) => item.type === DEFAULT_CHECKED_TYPE.Dough
      );

      state.ingredients = payload.ingredients
        .map((ingredient) => normalizeData(ingredient, INGREDIENTS_TYPES))
        .map((ingredient) => addCount(ingredient));
      state.selectedPizza.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.count > COUNT_INGREDIENT.Empty
      );

      state.sauces = payload.sauces
        .map((sauce) => normalizeData(sauce, SAUCES_TYPES))
        .map((sauce) => addDefaultChecked(sauce, DEFAULT_CHECKED_TYPE.Sauce));
      state.selectedPizza.sauce = state.sauces.find(
        (item) => item.type === DEFAULT_CHECKED_TYPE.Sauce
      );

      state.sizes = payload.sizes
        .map((size) => normalizeData(size, SIZES_TYPES))
        .map((size) => addDefaultChecked(size, DEFAULT_CHECKED_TYPE.Size));
      state.selectedPizza.size = state.sizes.find(
        (item) => item.type === DEFAULT_CHECKED_TYPE.Size
      );
    },

    [Mutations.UpdatePizzaName]: (state, payload) => {
      state.selectedPizza.name = payload;
    },

    [Mutations.SelectDough]: (state, payload) => {
      state.selectedPizza.dough = payload;
    },

    [Mutations.SelectSize]: (state, payload) => {
      state.selectedPizza.size = payload;
    },

    [Mutations.SelectSauce]: (state, payload) => {
      state.selectedPizza.sauce = payload;
    },

    [Mutations.AddIngredient]: (state, payload) => {
      const alreadyAddedIngredient = state.selectedPizza.ingredients.find(
        (ingredient) => ingredient.type === payload
      );

      if (alreadyAddedIngredient) {
        alreadyAddedIngredient.count++;
      } else {
        state.selectedPizza.ingredients.push(
          state.ingredients.find((ingredient) => ingredient.type === payload)
        );
        state.selectedPizza.ingredients.find(
          (ingredient) => ingredient.type === payload
        ).count++;
      }
    },

    [Mutations.RemoveIngredient]: (state, payload) => {
      const ingredient = state.selectedPizza.ingredients.find(
        (ingredient) => ingredient.type === payload
      );

      if (ingredient.count === COUNT_INGREDIENT.One) {
        ingredient.count--;

        const indexOfIngredient =
          state.selectedPizza.ingredients.indexOf(ingredient);

        state.selectedPizza.ingredients.splice(indexOfIngredient, 1);
      } else {
        ingredient.count--;
      }
    },

    [Mutations.AddPriceAndCount]: (state, payload) => {
      state.selectedPizza.price = payload;
    },

    [Mutations.ResetPizza]: (state) => {
      state.selectedPizza.name = "";
      state.selectedPizza.ingredients = [];
      state.ingredients.forEach((ingredient) => {
        ingredient.count = 0;
      });
    },

    [Mutations.SetPizzaFromCart]: (state, payload) => {
      const assignSelectedPizza = cloneDeep(payload);
      state.selectedPizza = assignSelectedPizza;

      changeDefaultChecked(state.dough, payload.dough.type);
      changeDefaultChecked(state.sauces, payload.sauce.type);
      changeDefaultChecked(state.sizes, payload.size.type);

      state.ingredients = state.ingredients.map((ingredient) => {
        const selectedIngredient = payload.ingredients.find(
          (item) => ingredient.type === item.type
        );

        if (selectedIngredient) {
          return selectedIngredient;
        }

        return ingredient;
      });
    },
  },
  getters: {
    [Getters.FinalPrice]: (state) => {
      const sizesMultiplier = state.selectedPizza.size.multiplier;
      const doughPrice = state.selectedPizza.dough.price;
      const saucePrice = state.selectedPizza.sauce.price;
      const ingredientsPrice = state.selectedPizza.ingredients?.reduce(
        (sum, current) => sum + current.count * current.price,
        0
      );

      return sizesMultiplier * (doughPrice + saucePrice + ingredientsPrice);
    },
  },
};
