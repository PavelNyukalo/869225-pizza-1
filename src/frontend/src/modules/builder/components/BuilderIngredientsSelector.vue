<template>
  <div class="ingredients">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>

      <RadioButton
        v-for="{ id, name, type } in sauces"
        :key="id"
        :type="type"
        class="radio ingredients__input"
        inputName="sauce"
        @changeInput="setSauce"
      >
        <span>{{ name }}</span>
      </RadioButton>
    </div>

    <div class="ingredients__filling">
      <p>Начинка:</p>

      <ul class="ingredients__list">
        <BuilderIngredientsItem
          v-for="{ id, name, type, count } in ingredients"
          :key="id"
          :name="name"
          :typeIng="type"
          :count="count"
          @addIngType="addIngType"
          @removeIngType="removeIngType"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton";
import BuilderIngredientsItem from "@/modules/builder/components/BuilderIngredientsItem";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    RadioButton,
    BuilderIngredientsItem,
  },

  props: {
    sauces: Array,
    ingredients: Array,
  },

  mounted() {
    const checkedElem = this.$el.querySelector('input[value="tomato"]');
    checkedElem.checked = true;

    this.$emit("setSauce", {
      value: checkedElem.value,
      price: this.sauces.find((item) => item.type === checkedElem.value).price,
    });
  },

  methods: {
    setSauce(value) {
      this.$emit("setSauce", {
        value: value,
        price: this.sauces.find((item) => item.type === value).price,
      });
    },

    addIngType(value) {
      this.$emit("addIngType", value);
    },

    removeIngType(value) {
      this.$emit("removeIngType", value);
    },
  },
};
</script>
