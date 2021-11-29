<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <BuilderDoughSelector class="sheet__content" />
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <BuilderSizeSelector class="sheet__content" />
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <BuilderIngredientsSelector class="sheet__content" />
          </div>
        </div>

        <div class="content__pizza">
          <AppInput
            v-model="pizzaName"
            label="Название пиццы"
            :visuallyHidden="true"
            name="pizza_name"
            placeholder="Введите название пиццы"
            :required="true"
            autocomplete="off"
          />

          <BuilderPizzaView />

          <BuilderPriceCounter />
        </div>
      </div>
    </form>

    <router-view />
  </main>
</template>

<script>
import { mapState } from "vuex";
import { BUILDER, Actions, Mutations } from "@/store/modules/builder.store";
import { CART } from "@/store/modules/cart.store";

import AppInput from "@/common/components/AppInput.vue";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";

export default {
  name: "IndexHome",

  components: {
    AppInput,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  beforeMount() {
    const pizzaFromCart = this.selectedProducts[this.$route.params.indexPizza];

    this.$route.params.indexPizza !== undefined
      ? this.$store.commit(
          `${BUILDER}/${Mutations.SetPizzaFromCart}`,
          pizzaFromCart
        )
      : this.$store.dispatch(`${BUILDER}/${Actions.CreatePizza}`);
  },

  mounted() {
    console.log(this.$route);
  },

  computed: {
    ...mapState(BUILDER, {
      name: (state) => state.selectedPizza.name,
    }),

    ...mapState(CART, ["selectedProducts"]),

    pizzaName: {
      get() {
        return this.name;
      },
      set(value) {
        this.$store.commit(`${BUILDER}/${Mutations.UpdatePizzaName}`, value);
      },
    },
  },
};
</script>
