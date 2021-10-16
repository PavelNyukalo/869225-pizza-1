<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <router-link to="/" class="logo">
          <img :src="LogoIcon" alt="V!U!E! Pizza logo" width="90" height="40" />
        </router-link>
      </div>
      <div class="header__cart">
        <router-link to="/cart">{{ priceBasket }} ₽</router-link>
      </div>
      <div class="header__user">
        <router-link to="login" class="header__login">
          <span>Войти</span>
        </router-link>
      </div>
    </header>

    <component :is="layout" @changePriceBasket="priceBasket = $event">
      <slot />
    </component>
  </div>
</template>

<script>
/** Картинки */
import LogoIcon from "@/assets/img/logo.svg";

const defaultLayout = "Index";

export default {
  name: "AppLayout",

  data() {
    return {
      LogoIcon,
      priceBasket: 0,
    };
  },

  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout;
      return () => import(`@/views/${layout}.vue`);
    },
  },
};
</script>
