<template>
  <header class="header">
    <div class="header__logo">
      <a href="index.html" class="logo">
        <img :src="LogoIcon" alt="V!U!E! Pizza logo" width="90" height="40" />
      </a>
    </div>
    <div class="header__cart">
      <a href="cart.html">{{ priceBasket }} ₽</a>
    </div>
    <div class="header__user">
      <a href="#" class="header__login"><span>Войти</span></a>
    </div>
  </header>
</template>

<script>
/** Картинки */
import LogoIcon from "@/assets/img/logo.svg";

export default {
  name: "AppLayout",

  props: {
    priceBasket: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      LogoIcon,
    };
  },
};
</script>
