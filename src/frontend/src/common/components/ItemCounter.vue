<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      @click="countRemove"
      :disabled="condMinusDissabled"
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
      :disabled="condPlusDissabled"
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
    condMinusDissabled: {
      type: Boolean,
      required: true,
    },
    condPlusDissabled: {
      type: Boolean,
      required: true,
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
