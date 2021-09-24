<template>
  <label :class="`${className} ${className}--${type}`">
    <input
      type="radio"
      :name="inputName"
      class="visually-hidden"
      :value="type"
      @input="$emit('changeInput', $event.target.value)"
    />
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: "RadioButton",

  props: {
    className: String,

    inputName: String,

    type: String,
  },
};
</script>
