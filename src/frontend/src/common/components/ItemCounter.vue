<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      @click="countRemove"
      :disabled="count === COUNT_INGREDIENT.Empty"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      readonly
      class="counter__input"
      :value="count"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="countAdd"
      :disabled="count === COUNT_INGREDIENT.Max"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { COUNT_INGREDIENT } from "@/common/constants";

export default {
  name: "ItemCounter",

  props: {
    count: {
      type: Number,
      default: COUNT_INGREDIENT.Empty,
    },
  },

  model: {
    prop: "count",
  },

  data() {
    return {
      COUNT_INGREDIENT,
    };
  },

  methods: {
    countAdd() {
      if (this.count <= COUNT_INGREDIENT.Max) {
        this.$emit("addCount");
      }
    },
    countRemove() {
      if (this.count >= COUNT_INGREDIENT.Empty) {
        this.$emit("removeCount");
      }
    },
  },
};
</script>
