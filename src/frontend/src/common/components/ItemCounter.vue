<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--disabled counter__button--minus"
      @click="countRemove"
      :disabled="value === 0"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      readonly
      class="counter__input"
      :value="value"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="countAdd"
      :disabled="value === 3"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",

  data() {
    return {
      value: 0,
    };
  },

  methods: {
    // TODO: Заменить на один метод, принимащий строку что нужно сделать
    countAdd() {
      if (this.value !== 3) {
        this.value++;
        this.$emit("addCount", this.value);
      }
    },

    countRemove() {
      if (this.value !== 0) {
        this.value--;
        this.$emit("removeCount", this.value);
      }
    },
  },
};
</script>
