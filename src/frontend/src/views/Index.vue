<template>
  <div>
    <AppLayout :priceBasket="priceBasket" />
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

              <BuilderSizeSelector
                class="sheet__content"
                :sizes="sizes"
                @setSize="setSize"
              />
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
                @addIngType="addIngType"
                @removeIngType="removeIngType"
              />
            </div>
          </div>

          <div class="content__pizza">
            <label class="input">
              <span class="visually-hidden">Название пиццы</span>
              <input
                v-model="pizzaName"
                type="text"
                name="pizza_name"
                placeholder="Введите название пиццы"
                required
                autocomplete="off"
              />
            </label>

            <BuilderPizzaView
              :pizzaFoundation="pizzaFoundation"
              :ingredients="ingredients"
              @changeIngredientsDrop="changeIngredientsDrop"
            />

            <BuilderPriceCounter
              :finalPrice="finalPrice"
              :pizzaObjectInBasket="pizzaObjectInBasket"
              @addPizzaInBasket="addPizzaInBasket"
            />
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
import { normalizeData, addCountIngredients } from "@/common/helpers.js";

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
      ingredients: pizza.ingredients.map((ingredient) => {
        return normalizeData(
          addCountIngredients(ingredient),
          INGREDIENTS_TYPES
        );
      }),
      sauces: pizza.sauces.map((sauce) => normalizeData(sauce, SAUCES_TYPES)),
      sizes: pizza.sizes.map((size) => normalizeData(size, SIZES_TYPES)),
      user,

      pizzaDough: {},
      pizzaSauce: {},
      pizzaSize: {},
      pizzaName: "",

      priceBasket: 0,
    };
  },

  computed: {
    pizzaFoundation() {
      return `pizza--foundation--${this.pizzaDough.value}-${this.pizzaSauce.value}`;
    },

    pizzaObjectInBasket() {
      return {
        dough: this.pizzaDough,
        sauce: this.pizzaSauce,
        ingredients: this.ingredients.filter(
          (ingredient) => ingredient.count > 0
        ),
        size: this.pizzaSize,
        name: this.pizzaName,
      };
    },

    finalPrice() {
      const sizesMultiplier = this.pizzaObjectInBasket.size.multiplier;
      const doughPrice = this.pizzaObjectInBasket.dough.price;
      const saucePrice = this.pizzaObjectInBasket.sauce.price;
      const ingredientsPrice = this.pizzaObjectInBasket.ingredients?.reduce(
        (sum, current) => sum + current.count * current.price,
        0
      );

      return sizesMultiplier * (doughPrice + saucePrice + ingredientsPrice);
    },
  },

  methods: {
    setDough(value) {
      this.pizzaDough = value;
      this.pizzaDough.value = Dough[value.value];
    },

    setSauce(value) {
      this.pizzaSauce = value;
    },

    setSize(value) {
      this.pizzaSize = value;
    },

    addIngType(type) {
      this.ingredients.find((item) => item.type === type).count++;
    },

    removeIngType(type) {
      this.ingredients.find((item) => item.type === type).count--;
    },

    changeIngredientsDrop(transferData) {
      this.addIngType(transferData.type);
    },

    addPizzaInBasket() {
      this.priceBasket += this.finalPrice;

      this.resetSelect();
    },

    resetSelect() {
      this.pizzaName = "";
      this.ingredients.forEach((item) => (item.count = 0));
    },
  },
};
</script>
