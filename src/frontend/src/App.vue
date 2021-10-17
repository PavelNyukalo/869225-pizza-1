<template>
  <div id="app">
    <AppLayout :priceBasket="priceBasket">
      <!-- Временное решение до подключения Vuex -->
      <router-view @changePriceBasket="priceBasket = $event" />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";

export default {
  name: "App",
  components: {
    AppLayout,
  },

  data() {
    return {
      priceBasket: 0,
    };
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
