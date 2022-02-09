<template>
  <li class="ingredients__item">
    <AppDrag :transferData="transferData" :draggable="draggable">
      <span class="filling" :class="`${type}`">
        {{ name }}
      </span>
    </AppDrag>

    <ItemCounter
      class="ingredients__counter"
      v-model="count"
      :condPlusDisabled="isPlusDisabled"
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
      return `filling--${this.typeIng}`;
    },

    transferData() {
      return {
        type: this.typeIng,
      };
    },

    draggable() {
      return this.count !== COUNT_INGREDIENT.Max;
    },

    isPlusDisabled() {
      return this.count === COUNT_INGREDIENT.Max;
    },
  },

  methods: {
    ...mapMutations(BUILDER, [
      `${Mutations.AddIngredient}`,
      `${Mutations.RemoveIngredient}`,
    ]),

    addIng() {
      this.addIngredient(this.typeIng);
    },

    removeIng() {
      this.removeIngredient(this.typeIng);
    },
  },
};
</script>
