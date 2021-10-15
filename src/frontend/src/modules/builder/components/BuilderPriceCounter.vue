<template>
  <div class="content__result">
    <p>Итого: {{ finalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="disabled || !isName"
      @click="addPizzaInBasket"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",

  props: {
    finalPrice: Number,
    pizzaObjectInBasket: Object,
  },

  computed: {
    isIngredients() {
      return this.$props.pizzaObjectInBasket.ingredients?.length > 0;
    },

    isName() {
      return this.$props.pizzaObjectInBasket.name?.length > 0;
    },

    disabled() {
      return !this.isIngredients && !this.isName;
    },
  },

  methods: {
    addPizzaInBasket() {
      this.$emit("addPizzaInBasket");
    },
  },
};
</script>
