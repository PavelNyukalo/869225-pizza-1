<template>
  <div class="diameter">
    <RadioButton
      v-for="{ id, name, type, defaultChecked } in sizes"
      :key="id"
      :type="type"
      :checked="defaultChecked"
      className="diameter__input"
      inputName="diameter"
      @changeInput="setSize"
    >
      <span>{{ name }}</span>
    </RadioButton>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { BUILDER, Mutations } from "@/store/modules/builder.store";

import RadioButton from "@/common/components/RadioButton";

export default {
  name: "BuilderSizeSelector",

  components: {
    RadioButton,
  },

  computed: {
    ...mapState(BUILDER, {
      sizes: "sizes",
    }),
  },

  methods: {
    ...mapMutations(BUILDER, {
      mutationSize: `${Mutations.SelectSize}`,
    }),
    setSize(value) {
      this.mutationSize(this.sizes.find((item) => item.type === value));
    },
  },
};
</script>
