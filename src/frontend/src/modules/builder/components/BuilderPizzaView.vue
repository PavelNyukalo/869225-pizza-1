<template>
  <div class="content__constructor">
    <AppDrop @drop="addDrop">
      <div :class="`pizza ${pizzaFoundation}`">
        <div class="pizza__wrapper"></div>
      </div>
    </AppDrop>
  </div>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { COUNT_INGREDIENT } from "@/common/constants";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  props: {
    pizzaFoundation: String,
    ingredients: Array,
  },

  mounted() {
    this.addIngredientView();
  },

  watch: {
    ingredients: {
      deep: true,
      handler() {
        this.addIngredientView();
      },
    },
  },

  methods: {
    addDrop(transferData) {
      this.$emit("changeIngredientsDrop", transferData);
    },

    addIngredientView() {
      const pizzaWrapper = this.$el.querySelector(".pizza__wrapper");
      const ingredientsFragment = document.createDocumentFragment();

      pizzaWrapper.innerHTML = "";

      this.ingredients.forEach(({ count, type }) => {
        if (count === COUNT_INGREDIENT.Empty) return;

        const newIngDiv = document.createElement("div");
        switch (count) {
          case COUNT_INGREDIENT.Min:
            newIngDiv.classList.add(
              "pizza__filling",
              `pizza__filling--${type}`
            );
            break;

          case COUNT_INGREDIENT.Two:
            newIngDiv.classList.add(
              "pizza__filling",
              `pizza__filling--${type}`,
              "pizza__filling--second"
            );
            break;

          case COUNT_INGREDIENT.Max:
            newIngDiv.classList.add(
              "pizza__filling",
              `pizza__filling--${type}`,
              "pizza__filling--third"
            );
            break;
        }
        ingredientsFragment.appendChild(newIngDiv);
      });

      pizzaWrapper.appendChild(ingredientsFragment);
    },
  },
};
</script>
