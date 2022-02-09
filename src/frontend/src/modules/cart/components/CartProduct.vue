<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        :src="require('@/assets/img/product.svg')"
        class="product__img"
        width="56"
        height="56"
        :alt="selectedProduct.name"
      />
      <div class="product__text">
        <h2>{{ selectedProduct.name }}</h2>
        <ul>
          <li>{{ selectedProduct.size.name }}, на {{ dough }} тесте</li>
          <li>Соус: {{ sauce }}</li>
          <li>Начинка: {{ ingredients }}</li>
        </ul>
      </div>
    </div>

    <ItemCounter
      class="cart-list__counter"
      :count="selectedProduct.count"
      :isOrangeButton="true"
      @addCount="addCountPizza"
      @removeCount="removeCountPizza"
    />

    <div class="cart-list__price">
      <b>{{ selectedProduct.fullPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" class="cart-list__edit" @click="toBuilder">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import { CART, Mutations } from "@/store/modules/cart.store";

import ItemCounter from "@/common/components/ItemCounter";

import { COUNT_INGREDIENT } from "@/common/constants";

const Dough = {
  light: "тонком",
  large: "толстом",
};

const Sauce = {
  tomato: "томатный",
  creamy: "сливочный",
};

export default {
  name: "CartProduct",

  components: {
    ItemCounter,
  },

  props: {
    selectedProduct: {
      type: Object,
      required: true,
    },

    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    dough() {
      return Dough[this.selectedProduct.dough.type];
    },

    sauce() {
      return Sauce[this.selectedProduct.sauce.type];
    },

    ingredients() {
      return this.selectedProduct.ingredients
        .map((item) => item.name.toLowerCase())
        .join(", ");
    },
  },

  methods: {
    ...mapMutations(CART, [
      `${Mutations.AddPizza}`,
      `${Mutations.RemovePizza}`,
      `${Mutations.DeletePizza}`,
    ]),

    addCountPizza() {
      this.addPizza(this.index);
    },

    removeCountPizza() {
      this.selectedProduct.count > COUNT_INGREDIENT.One
        ? this.removePizza(this.index)
        : this.deletePizza(this.index);
    },

    toBuilder() {
      this.$router.push({
        name: "IndexHome",
        params: { indexPizza: this.index },
      });
    },
  },
};
</script>
