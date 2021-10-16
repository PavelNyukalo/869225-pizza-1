<template>
  <div class="diameter">
    <RadioButton
      v-for="{ id, name, type, defaultChecked } in sizes"
      :key="id"
      :type="type"
      :checked="defaultChecked"
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
    sizes: {
      type: Array,
      required: true,
    },
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
