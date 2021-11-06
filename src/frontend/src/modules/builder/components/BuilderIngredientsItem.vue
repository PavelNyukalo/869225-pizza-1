<template>
  <li class="ingredients__item">
    <AppDrag :transferData="transferData" :draggable="draggable">
      <span class="filling" :class="`${type}`">
        {{ name }}
      </span>
    </AppDrag>

    <ItemCounter
      v-model="count"
      :condMinusDissabled="isMinusDissabled"
      :condPlusDissabled="isPlusDissabled"
      @addCount="addIng"
      @removeCount="removeIng"
    />
  </li>
</template>

<script>
import { mapMutations } from "vuex";
import { BUILDER, Mutations } from "@/store/modules/builder.store";

import { COUNT_INGREDIENT } from "@/common/constants";

import AppDrag from "@/common/components/AppDrag";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngredientsItem",

  components: {
    AppDrag,
    ItemCounter,
  },

  props: {
    typeIng: {
      type: String,
      required: true,
    },

    count: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      COUNT_INGREDIENT,
    };
  },

  computed: {
    type() {
      return `filling--${this.$props.typeIng}`;
    },

    transferData() {
      return {
        type: this.typeIng,
      };
    },

    draggable() {
      return this.count !== COUNT_INGREDIENT.Max;
    },

    isMinusDissabled() {
      return this.count === COUNT_INGREDIENT.Empty;
    },

    isPlusDissabled() {
      return this.count === COUNT_INGREDIENT.Max;
    },
  },

  methods: {
    ...mapMutations(BUILDER, {
      addIngredientMutation: `${Mutations.AddIngredient}`,
      removeIngredientMutation: `${Mutations.RemoveIngredient}`,
    }),

    addIng() {
      if (this.count <= COUNT_INGREDIENT.Max) {
        this.addIngredientMutation(this.$props.typeIng);
      }
    },

    removeIng() {
      if (this.count >= COUNT_INGREDIENT.Empty) {
        this.removeIngredientMutation(this.$props.typeIng);
      }
    },
  },
};
</script>
