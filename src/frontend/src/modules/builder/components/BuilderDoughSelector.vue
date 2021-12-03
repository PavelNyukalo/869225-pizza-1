<template>
  <div class="dough">
    <RadioButton
      v-for="{ id, name, description, type, defaultChecked } in dough"
      :key="id"
      :type="type"
      :checked="defaultChecked"
      className="dough__input"
      inputName="dough"
      @changeInput="setDough"
    >
      <b> {{ name }} </b>
      <span> {{ description }} </span>
    </RadioButton>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { BUILDER, Mutations } from "@/store/modules/builder.store";

import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderDoughSelector",

  components: {
    RadioButton,
  },

  computed: {
    ...mapState(BUILDER, ["dough"]),
  },

  methods: {
    ...mapMutations(BUILDER, [`${Mutations.SelectDough}`]),

    setDough(value) {
      this.selectDough(this.dough.find((item) => item.type === value));
    },
  },
};
</script>
