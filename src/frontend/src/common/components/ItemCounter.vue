<template>
  <div class="counter counter--orange">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      @click="countRemove"
      :disabled="condMinusDisabled"
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
      :class="[
        'counter__button',
        'counter__button--plus',
        {
          'counter__button--orange': isOrangeButton,
        },
      ]"
      @click="countAdd"
      :disabled="condPlusDisabled"
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
      required: true,
    },
    condPlusDisabled: {
      type: Boolean,
      default: false,
    },
    isOrangeButton: {
      type: Boolean,
      default: false,
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

  computed: {
    condMinusDisabled() {
      return this.count === COUNT_INGREDIENT.Empty;
    },
  },

  methods: {
    countAdd() {
      this.$emit("addCount");
    },
    countRemove() {
      this.$emit("removeCount");
    },
  },
};
</script>
