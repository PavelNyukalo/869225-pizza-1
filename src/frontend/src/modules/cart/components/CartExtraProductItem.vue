<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img
        :src="require(`@/assets/img/${product.type}.svg`)"
        width="39"
        height="60"
        :alt="product.name"
      />
      <span>{{ product.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <ItemCounter
        class="additional-list__counter"
        v-model="product.count"
        :isOrangeButton="true"
        @addCount="addProduct"
        @removeCount="removeProduct"
      />

      <div class="additional-list__price">
        <b>{{ product.fullPrice }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import { CART, Mutations } from "@/store/modules/cart.store";

import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "CartExtraProductItem",

  components: {
    ItemCounter,
  },

  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapMutations(CART, [
      `${Mutations.AddExtraProduct}`,
      `${Mutations.RemoveExtraProduct}`,
    ]),

    addProduct() {
      this.addExtraProduct(this.product.type);
    },

    removeProduct() {
      this.removeExtraProduct(this.product.type);
    },
  },
};
</script>
