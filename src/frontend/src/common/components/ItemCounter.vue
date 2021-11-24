<template>
  <div class="counter counter--orange ingredients__counter">
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
export default {
  name: "ItemCounter",

  props: {
    count: {
      type: Number,
      required: true,
    },
    condMinusDisabled: {
      type: Boolean,
      required: true,
    },
    condPlusDisabled: {
      type: Boolean,
      required: true,
    },
    isOrangeButton: {
      type: Boolean,
      default: false,
    },
  },

  model: {
    prop: "count",
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
