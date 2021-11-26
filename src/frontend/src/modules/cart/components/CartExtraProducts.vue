<template>
  <ul class="additional-list">
    <CartExtraProductItem
      v-for="(product, i) in extraProduct"
      :key="i"
      :product="product"
    />
  </ul>
</template>

<script>
import { mapState } from "vuex";
import { CART } from "@/store/modules/cart.store";

import CartExtraProductItem from "@/modules/cart/components/CartExtraProductItem";

export default {
  name: "CartExtraProducts",

  components: {
    CartExtraProductItem,
  },

  computed: {
    ...mapState(CART, ["extraProduct"]),
  },
};
</script>
