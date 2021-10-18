<template>
  <div>
    <AppLayoutHeader :priceBasket="priceBasket" />
    <AppLayoutSidebar />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader.vue";
import AppLayoutSidebar from "@/layouts/AppLayoutSidebar.vue";

export default {
  name: "AppLayoutWithSidebar",

  components: {
    AppLayoutHeader,
    AppLayoutSidebar,
  },

  props: {
    priceBasket: {
      type: Number,
      required: true,
    },
  },
};
</script>
