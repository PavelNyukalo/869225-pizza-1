<template>
  <div class="content__result">
    <p>Итого: {{ finalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="disabled"
      @click="addPizzaInBasket"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
import cloneDeep from "lodash.clonedeep";
import { mapState, mapMutations, mapGetters } from "vuex";
import { BUILDER, Mutations, Getters } from "@/store/modules/builder.store";
import { CART, Mutations as CartMutations } from "@/store/modules/cart.store";

export default {
  name: "BuilderPriceCounter",

  props: {
    withRouteParams: {
      type: Boolean,
      required: true,
    },
  },

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
      return !this.isIngredients || !this.isName;
    },

    buttonText() {
      return this.$props.withRouteParams ? "Сохранить" : "Готовьте!";
    },
  },

  methods: {
    ...mapMutations(BUILDER, [
      `${Mutations.AddPriceAndCount}`,
      `${Mutations.ResetPizza}`,
    ]),

    ...mapMutations(CART, [
      `${CartMutations.AddPizzaInCart}`,
      `${CartMutations.UpdatePizza}`,
    ]),

    addPizzaInBasket() {
      this.addPriceAndCount(this.finalPrice);
      const assignSelectedPizza = cloneDeep(this.selectedPizza);

      if (this.$props.withRouteParams) {
        this.updatePizza({
          index: this.$route.params.indexPizza,
          item: assignSelectedPizza,
        });
      } else {
        this.addPizzaInCart(assignSelectedPizza);
        this.resetPizza();
      }
    },
  },
};
</script>
