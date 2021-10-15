<template>
  <div class="dough">
    <RadioButton
      v-for="{ id, name, description, type } in dough"
      :key="id"
      :type="type"
      className="dough__input"
      inputName="dough"
      @changeInput="setDough"
    >
      <b> {{ name }} </b>
      <span> {{ description }} </span>
    </RadioButton>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",

  components: {
    RadioButton,
  },

  props: {
    dough: Array,
  },

  mounted() {
    const checkedElem = this.$el.querySelector('input[value="light"]');
    checkedElem.checked = true;

    this.$emit("setDough", {
      value: checkedElem.value,
      price: this.dough.find((item) => item.type === checkedElem.value).price,
    });
  },

  methods: {
    setDough(value) {
      this.$emit("setDough", {
        value: value,
        price: this.dough.find((item) => item.type === value).price,
      });
    },
  },
};
</script>
