<template>
  <div class="diameter">
    <RadioButton
      v-for="{ id, name, type } in sizes"
      :key="id"
      :type="type"
      className="diameter__input"
      inputName="diameter"
      @changeInput="setSize"
    >
      <span>{{ name }}</span>
    </RadioButton>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",

  components: {
    RadioButton,
  },

  props: {
    sizes: Array,
  },

  mounted() {
    const checkedElem = this.$el.querySelector('input[value="normal"]');
    checkedElem.checked = true;

    this.$emit("setSize", {
      value: checkedElem.value,
      multiplier: this.sizes.find((item) => item.type === checkedElem.value)
        .multiplier,
    });
  },

  methods: {
    setSize(value) {
      this.$emit("setSize", {
        value: value,
        multiplier: this.sizes.find((item) => item.type === value).multiplier,
      });
    },
  },
};
</script>
