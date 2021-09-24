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
          v-for="{ id, name, type } in ingredients"
          :key="id"
          :name="name"
          :typeIng="type"
          @addIngType="addIngType"
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

    this.$emit("setSauce", checkedElem.value);
  },

  methods: {
    setSauce(value) {
      this.$emit("setSauce", value);
    },
    addIngType(value) {
      this.$emit("globalAddIngType", value);
    },
  },
};
</script>
