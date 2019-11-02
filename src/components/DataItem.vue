<template>
  <dl class="data-item">
    <dt class="data-item__name font-small">{{name}}</dt>
    <dd class="data-item__value">
      {{value || "?"}}
      <unit-symbol :unit="unit" />
    </dd>
  </dl>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import UnitSymbol from "@/components/UnitSymbol.vue";

@Component({
  components: {
    UnitSymbol,
  },
})
export default class extends Vue {
  @Prop() name!: string;
  @Prop() value!: number | number;
  @Prop() unit!: string;
}
</script>

<style lang="scss" scoped>
.data-item {
  display: flex;
  align-items: flex-end;

  &__name {
    color: var(--color-main);
    font-weight: bold;
    font-family: Calibri, Arial, sans-serif;
  }

  &__value {
    font-size: calc(18px + (32 - 18) * ((100vw - 300px) / (1600 - 300)));
    font-weight: bold;
    margin-bottom: 0.5em;
  }
}
</style>