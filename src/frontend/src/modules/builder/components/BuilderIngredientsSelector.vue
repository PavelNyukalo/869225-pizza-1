<template>
  <div class="ingredients">
    <div class="ingredients__sauce">
      <p>Основной соус:</p>

      <RadioButton
        v-for="{ id, name, type, defaultChecked } in sauces"
        :key="id"
        :type="type"
        :checked="defaultChecked"
        class="radio"
        className="ingredients__input"
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
    sauces: {
      type: Array,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },
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
