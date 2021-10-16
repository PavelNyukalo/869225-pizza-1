<template>
  <div class="content__constructor">
    <AppDrop @drop="addDrop">
      <div :class="`pizza ${pizzaFoundation}`">
        <div class="pizza__wrapper">
          <div
            v-for="{ id, count, type } in ingredientsClasses"
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
import AppDrop from "@/common/components/AppDrop";
import { COUNT_INGREDIENT } from "@/common/constants";

export default {
  name: "BuilderPizzaView",

  components: {
    AppDrop,
  },

  props: {
    pizzaDough: {
      type: String,
      required: true,
    },

    pizzaSauce: {
      type: String,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      COUNT_INGREDIENT,
    };
  },

  computed: {
    ingredientsClasses() {
      return this.ingredients.filter((ingredient) => ingredient.count > 0);
    },
    pizzaFoundation() {
      return `pizza--foundation--${this.$props.pizzaDough}-${this.$props.pizzaSauce}`;
    },
  },

  methods: {
    addDrop(transferData) {
      this.$emit("changeIngredientsDrop", transferData);
    },
  },
};
</script>
