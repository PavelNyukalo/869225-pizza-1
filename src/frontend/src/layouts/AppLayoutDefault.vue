<template>
  <div>
    <AppLayoutHeader :priceBasket="priceBasket" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";

export default {
  name: "AppLayoutDefault",

  components: {
    AppLayoutHeader,
  },

  props: {
    priceBasket: {
      type: Number,
      required: true,
    },
  },
};
</script>
