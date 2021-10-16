<template>
  <div
    :class="['drag', { 'drag--no-drag': !draggable }]"
    :draggable="draggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "AppDrag",
  props: {
    transferData: {
      type: Object,
      required: true,
    },
    draggable: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onDrag({ dataTransfer }) {
      this.$emit("drag");
      dataTransfer.effectAllowed = "move";
      dataTransfer.dropEffect = "move";
      dataTransfer.setData("payload", JSON.stringify(this.transferData));
    },
  },
};
</script>

<style lang="scss" scoped>
.drag {
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  &--no-drag {
    cursor: no-drop;
  }
}
</style>
