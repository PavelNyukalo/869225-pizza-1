import Vue from "vue";
import Vuex from "vuex";

import builder, { BUILDER } from "./modules/builder.store";
import cart, { CART } from "./modules/cart.store";
import orders, { ORDERS } from "./modules/orders.store";
import auth, { AUTH } from "./modules/auth.store";

Vue.use(Vuex);

const state = () => ({
  strict: true,
  modules: {
    [BUILDER]: builder,
    [CART]: cart,
    [ORDERS]: orders,
    [AUTH]: auth,
  },
});

export default new Vuex.Store({
  state,
});
