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
import { mapState, mapMutations, mapGetters } from "vuex";
import { BUILDER, Mutations, Getters } from "@/store/modules/builder.store";

export default {
  name: "BuilderPriceCounter",

  computed: {
    ...mapState(BUILDER, {
      name: (state) => state.selectedPizza.name,
      ingredients: (state) => state.selectedPizza.ingredients,
      selectedPizza: "selectedPizza",
    }),

    ...mapGetters(BUILDER, [Getters.FinalPrice]),

    isIngredients() {
      return this.ingredients?.length > 0;
    },

    isName() {
      return this.name?.length > 0;
    },

    disabled() {
      return !this.isIngredients && !this.isName;
    },
  },

  methods: {
    ...mapMutations(BUILDER, [`${Mutations.ResetSelectPizza}`]),

    addPizzaInBasket() {
      this.resetSelectPizza();
      // TODO: Вызывать мутацию модуля корзины
      this.$emit("addPizzaInBasket");
    },
  },
};
</script>
