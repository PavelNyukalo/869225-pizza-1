<template>
  <div>
    <header class="header">
      <div class="header__logo">
        <a href="index.html" class="logo">
          <img :src="LogoIcon" alt="V!U!E! Pizza logo" width="90" height="40" />
        </a>
      </div>
      <div class="header__cart">
        <a href="cart.html">0 ₽</a>
      </div>
      <div class="header__user">
        <a href="#" class="header__login"><span>Войти</span></a>
      </div>
    </header>

    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <div class="sheet__content dough">
                <label
                  class="dough__input"
                  v-for="{ id, name, description, type } in dough"
                  :key="id"
                  :class="`dough__input--${type}`"
                >
                  <input
                    type="radio"
                    name="dought"
                    class="visually-hidden"
                    :value="type"
                  />
                  <b>{{ name }}</b>
                  <span>{{ description }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <div class="sheet__content diameter">
                <label
                  class="diameter__input"
                  v-for="{ id, name, type } in sizes"
                  :key="id"
                  :class="`diameter__input--${type}`"
                >
                  <input
                    type="radio"
                    name="diameter"
                    :value="type"
                    class="visually-hidden"
                  />
                  <span>{{ name }}</span>
                </label>
              </div>
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <div class="sheet__content ingredients">
                <div class="ingredients__sauce">
                  <p>Основной соус:</p>

                  <label
                    class="radio ingredients__input"
                    v-for="{ id, name, type } in sauces"
                    :key="id"
                  >
                    <input type="radio" name="sauce" :value="type" />
                    <span>{{ name }}</span>
                  </label>
                </div>

                <div class="ingredients__filling">
                  <p>Начинка:</p>

                  <ul class="ingredients__list">
                    <li
                      class="ingredients__item"
                      v-for="{ id, name, type } in ingredients"
                      :key="id"
                    >
                      <span class="filling" :class="`filling--${type}`">
                        {{ name }}
                      </span>

                      <div class="counter counter--orange ingredients__counter">
                        <button
                          type="button"
                          class="
                            counter__button
                            counter__button--disabled
                            counter__button--minus
                          "
                        >
                          <span class="visually-hidden">Меньше</span>
                        </button>
                        <input
                          type="text"
                          name="counter"
                          class="counter__input"
                          value="0"
                        />
                        <button
                          type="button"
                          class="counter__button counter__button--plus"
                        >
                          <span class="visually-hidden">Больше</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
              />
            </label>

            <div class="content__constructor">
              <div class="pizza pizza--foundation--big-tomato">
                <div class="pizza__wrapper">
                  <div class="pizza__filling pizza__filling--ananas"></div>
                  <div class="pizza__filling pizza__filling--bacon"></div>
                  <div class="pizza__filling pizza__filling--cheddar"></div>
                </div>
              </div>
            </div>

            <div class="content__result">
              <p>Итого: 0 ₽</p>
              <button type="button" class="button button--disabled" disabled>
                Готовьте!
              </button>
            </div>
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
/** Вспомогательные функции */
import { normalizeData } from "@/common/helpers.js";

/** Типы для нормализации */
import {
  DOUGH_TYPES,
  SIZES_TYPES,
  SAUCES_TYPES,
  INGREDIENTS_TYPES,
} from "@/common/constants.js";

/** Моки-данные */
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";

/** Картинки */
import LogoIcon from "@/assets/img/logo.svg";

export default {
  name: "IndexHome",
  data() {
    return {
      LogoIcon,
      misc,
      dough: pizza.dough.map((dough) => normalizeData(dough, DOUGH_TYPES)),
      ingredients: pizza.ingredients.map((ingredient) =>
        normalizeData(ingredient, INGREDIENTS_TYPES)
      ),
      sauces: pizza.sauces.map((sauce) => normalizeData(sauce, SAUCES_TYPES)),
      sizes: pizza.sizes.map((size) => normalizeData(size, SIZES_TYPES)),
      user,
    };
  },

  mounted() {
    this.$el.querySelector('input[value="light"]').checked = true;
    this.$el.querySelector('input[value="normal"]').checked = true;
    this.$el.querySelector('input[value="tomato"]').checked = true;
  },
};
</script>

<style lang="scss" scoped></style>
