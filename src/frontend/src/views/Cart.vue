<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="emptyCart" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>

        <div v-else>
          <CartProductList />

          <div class="cart__additional">
            <CartExtraProducts />
          </div>

          <div class="cart__form">
            <CartForm />
          </div>
        </div>
      </div>
    </main>
    <CartFooter v-if="!emptyCart" />

    <AppPopup />
  </form>
</template>

<script>
import { mapState } from "vuex";
import { CART } from "@/store/modules/cart.store";

import CartProductList from "@/modules/cart/components/CartProductList.vue";
import CartExtraProducts from "@/modules/cart/components/CartExtraProducts.vue";
import CartForm from "@/modules/cart/components/CartForm.vue";
import CartFooter from "@/modules/cart/components/CartFooter.vue";
import AppPopup from "@/common/components/AppPopup";

export default {
  name: "Cart",

  components: {
    CartProductList,
    CartExtraProducts,
    CartForm,
    CartFooter,
    AppPopup,
  },

  // beforeMount() {
  //   this.$store.dispatch(`${CART}/${Actions.LoadMisc}`);
  // },

  computed: {
    ...mapState(CART, ["selectedProducts"]),

    emptyCart() {
      return this.selectedProducts.length === 0;
    },
  },
};
</script>
