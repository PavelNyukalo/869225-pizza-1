<template>
  <li class="ingredients__item">
    <span class="filling" :class="`${type}`">
      {{ name }}
    </span>

    <ItemCounter @addCount="addIng" />
  </li>
</template>

<script>
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngredientsItem",

  components: {
    ItemCounter,
  },

  props: {
    typeIng: String,
    name: String,
  },

  data() {
    return {
      count: 0,
    };
  },

  computed: {
    type() {
      return `filling--${this.$props.typeIng}`;
    },
  },

  methods: {
    addIng(value) {
      // TODO: Продумать добавление и удаление
      if (value !== 3) {
        this.count = value;
        this.$emit("addIngType", this.type);
      }
    },
  },
};
</script>
