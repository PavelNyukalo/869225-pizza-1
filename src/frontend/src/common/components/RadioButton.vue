<template>
  <label :class="`${className} ${className}--${type}`">
    <input
      class="visually-hidden"
      type="radio"
      :name="inputName"
      :value="type"
      :checked="checked"
      @input="$emit('changeInput', $event.target.value)"
    />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "RadioButton",

  props: {
    className: {
      type: String,
      required: true,
    },

    inputName: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    checked: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
