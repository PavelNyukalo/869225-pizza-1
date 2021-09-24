<template>
  <div class="content__constructor">
    <div :class="`pizza ${pizzaFoundation}`">
      <div class="pizza__wrapper"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderPizzaView",

  props: {
    pizzaFoundation: String,
    pizzaClassesIng: Array,
  },

  watch: {
    pizzaClassesIng: {
      deep: true,
      handler: function () {
        // TODO: Реализовать создание компонента один раз
        this.pizzaClassesIng.forEach((item) => {
          const ingDiv = document.createElement("div");
          ingDiv.classList.add("pizza__filling", `pizza__${item}`);

          this.$el.querySelector(".pizza__wrapper").appendChild(ingDiv);
        });
      },
    },
  },
};
</script>
