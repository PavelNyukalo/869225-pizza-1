<template>
  <div class="content__constructor">
    <AppDrop @drop="addDrop">
      <div :class="`pizza ${pizzaFoundation}`">
        <div class="pizza__wrapper">
          <div
            v-for="{ id, count, type } in ingredients"
            :key="id"
            :class="[
              'pizza__filling',
              `pizza__filling--${type}`,
              {
                'pizza__filling--second': count === COUNT_INGREDIENT.Two,
                'pizza__filling--third': count === COUNT_INGREDIENT.Max,
              },
            ]"
          ></div>
        </div>
      </div>
    </AppDrop>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { BUILDER, Mutations } from "@/store/modules/builder.store";

import AppDrop from "@/common/components/AppDrop";
import { COUNT_INGREDIENT } from "@/common/constants";

const Dough = {
  light: "small",
  large: "big",
};

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  data() {
    return {
      COUNT_INGREDIENT,
    };
  },

  computed: {
    ...mapState(BUILDER, {
      dough: (state) => Dough[state.selectedPizza.dough.type],
      sauce: (state) => state.selectedPizza.sauce.type,
      ingredients: (state) => state.selectedPizza.ingredients,
    }),

    pizzaFoundation() {
      return `pizza--foundation--${this.dough}-${this.sauce}`;
    },
  },

  methods: {
    ...mapMutations(BUILDER, {
      addIngredientMutation: `${Mutations.AddIngredient}`,
    }),

    addDrop(transferData) {
      this.addIngredientMutation(transferData.type);
    },
  },
};
</script>
