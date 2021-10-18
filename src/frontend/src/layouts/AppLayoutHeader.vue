<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img :src="logoIcon" alt="V!U!E! Pizza logo" width="90" height="40" />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link to="/cart">{{ priceBasket }} ₽</router-link>
    </div>
    <div class="header__user">
      <router-link to="/login" class="header__login">
        <span>Войти</span>
      </router-link>
    </div>
  </header>
</template>

<script>
import logoIcon from "@/assets/img/logo.svg";

export default {
  name: "AppLayoutHeader",

  props: {
    priceBasket: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      logoIcon,
    };
  },
};
</script>
