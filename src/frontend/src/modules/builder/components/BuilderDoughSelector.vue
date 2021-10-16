<template>
  <div class="dough">
    <RadioButton
      v-for="{ id, name, description, type, defaultChecked } in dough"
      :key="id"
      :type="type"
      :checked="defaultChecked"
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
    dough: {
      type: Array,
      required: true,
    },
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
