<template>
  <div>
    <AppLayoutHeader />
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
};
</script>
