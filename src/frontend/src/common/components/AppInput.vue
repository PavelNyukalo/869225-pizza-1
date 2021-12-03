<template>
  <label :class="['input', { 'input--big-label': bigLabel }]">
    <span :class="{ 'visually-hidden': visuallyHidden }">{{ label }}</span>
    <input
      type="text"
      :value="inputValue"
      :name="name"
      :placeholder="placeholder"
      :required="required"
      :autocomplete="autocomplete"
      @input="$emit('input', $event.target.value)"
    />
  </label>
</template>

<script>
export default {
  name: "AppInput",

  props: {
    inputValue: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    bigLabel: {
      type: Boolean,
      required: false,
    },

    visuallyHidden: {
      type: Boolean,
      required: false,
    },

    name: {
      type: String,
      required: true,
    },

    placeholder: {
      type: String,
      default: "",
    },

    required: {
      type: Boolean,
      required: false,
    },

    autocomplete: {
      type: String,
      default: "on",
    },
  },

  model: {
    prop: "inputValue",
  },
};
</script>
