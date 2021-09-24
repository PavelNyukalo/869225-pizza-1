<template>
  <div class="diameter">
    <RadioButton
      v-for="{ id, name, type } in sizes"
      :key="id"
      :type="type"
      className="diameter__input"
      inputName="diameter"
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
    this.$el.querySelector('input[value="normal"]').checked = true;
  },
};
</script>
