<template>
  <ul class="cart-list sheet">
    <CartProduct
      v-for="(product, i) in selectedProducts"
      :key="product.name"
      :index="i"
      :selectedProduct="product"
    />
  </ul>
</template>

<script>
import { mapState } from "vuex";
import { CART } from "@/store/modules/cart.store";

import CartProduct from "@/modules/cart/components/CartProduct.vue";

export default {
  name: "CartProductList",

  components: {
    CartProduct,
  },

  computed: {
    ...mapState(CART, ["selectedProducts"]),
  },
};
</script>
