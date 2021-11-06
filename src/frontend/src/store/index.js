import Vue from "vue";
import Vuex from "vuex";

/* Vuex-modules */
import builder, { BUILDER } from "./modules/builder.store";
import cart, { CART } from "./modules/cart.store";
import orders, { ORDERS } from "./modules/orders.store";
import auth, { AUTH } from "./modules/auth.store";

export const Actions = {
  Init: "init",
};

export const Mutations = {};

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    [BUILDER]: builder,
    [CART]: cart,
    [ORDERS]: orders,
    [AUTH]: auth,
  },
  state: {
    misc: {},
    user: {},
  },
  actions: {},
  mutations: {},
});
