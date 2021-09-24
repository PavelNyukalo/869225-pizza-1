<template>
  <div>
    <AppLayout />
    <main class="content">
      <form action="#" method="post">
        <div class="content__wrapper">
          <h1 class="title title--big">Конструктор пиццы</h1>

          <div class="content__dough">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите тесто</h2>

              <BuilderDoughSelector
                class="sheet__content"
                :dough="dough"
                @setDough="setDough"
              />
            </div>
          </div>

          <div class="content__diameter">
            <div class="sheet">
              <h2 class="title title--small sheet__title">Выберите размер</h2>

              <BuilderSizeSelector class="sheet__content" :sizes="sizes" />
            </div>
          </div>

          <div class="content__ingredients">
            <div class="sheet">
              <h2 class="title title--small sheet__title">
                Выберите ингредиенты
              </h2>

              <BuilderIngredientsSelector
                class="sheet__content"
                :sauces="sauces"
                :ingredients="ingredients"
                @setSauce="setSauce"
                @globalAddIngType="globalAddIngType"
              />
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
                required
              />
            </label>

            <BuilderPizzaView
              :pizzaClassesIng="pizzaClassesIng"
              :pizzaFoundation="pizzaFoundation"
            />

            <BuilderPriceCounter />
          </div>
        </div>
      </form>
    </main>
  </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";

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

const Dough = {
  light: "small",
  large: "big",
};

export default {
  name: "IndexHome",

  components: {
    AppLayout,
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
  },

  data() {
    return {
      misc,
      dough: pizza.dough.map((dough) => normalizeData(dough, DOUGH_TYPES)),
      ingredients: pizza.ingredients.map((ingredient) =>
        normalizeData(ingredient, INGREDIENTS_TYPES)
      ),
      sauces: pizza.sauces.map((sauce) => normalizeData(sauce, SAUCES_TYPES)),
      sizes: pizza.sizes.map((size) => normalizeData(size, SIZES_TYPES)),
      user,

      pizzaDough: "",
      pizzaSauce: "",
      pizzaClassesIng: [],
    };
  },

  computed: {
    pizzaFoundation() {
      return `pizza--foundation--${this.pizzaDough}-${this.pizzaSauce}`;
    },
  },

  methods: {
    setDough(value) {
      this.pizzaDough = Dough[value];
    },

    setSauce(value) {
      this.pizzaSauce = value;
    },

    globalAddIngType(value) {
      this.pizzaClassesIng.push(value);
    },
  },
};
</script>
