<template>
  <header class="header">
    <div class="header__logo">
      <router-link to="/" class="logo">
        <img :src="logoIcon" alt="V!U!E! Pizza logo" width="90" height="40" />
      </router-link>
    </div>
    <div class="header__cart">
      <!-- TODO: Добавить из VUEX -->
      <router-link to="/cart">
        <!-- {{ priceBasket }} -->
        10 ₽</router-link
      >
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

  data() {
    return {
      logoIcon,
    };
  },
};
</script>
