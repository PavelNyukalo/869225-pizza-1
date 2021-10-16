<template>
  <li class="ingredients__item">
    <AppDrag :transferData="transferData" :draggable="draggable">
      <span class="filling" :class="`${type}`">
        {{ name }}
      </span>
    </AppDrag>

    <ItemCounter v-model="count" @addCount="addIng" @removeCount="removeIng" />
  </li>
</template>

<script>
import AppDrag from "@/common/components/AppDrag";
import ItemCounter from "@/common/components/ItemCounter";

export default {
  name: "BuilderIngredientsItem",

  components: {
    AppDrag,
    ItemCounter,
  },

  props: {
    typeIng: {
      type: String,
      required: true,
    },

    count: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
  },

  computed: {
    type() {
      return `filling--${this.$props.typeIng}`;
    },

    transferData() {
      return {
        count: this.count,
        type: this.typeIng,
      };
    },

    draggable() {
      return this.count !== 3;
    },
  },

  methods: {
    addIng() {
      if (this.count <= 3) {
        this.$emit("addIngType", this.$props.typeIng);
      }
    },

    removeIng() {
      if (this.count >= 0) {
        this.$emit("removeIngType", this.$props.typeIng);
      }
    },
  },
};
</script>
