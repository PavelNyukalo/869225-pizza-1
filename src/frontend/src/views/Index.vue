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
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              v-model="pizzaName"
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
              required
              autocomplete="off"
            />
          </label>

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

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";

export default {
  name: "IndexHome",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  beforeMount() {
    this.$store.dispatch(`${BUILDER}/${Actions.CreatePizza}`);
  },

  computed: {
    ...mapState(BUILDER, {
      name: (state) => state.selectedPizza.name,
    }),

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
