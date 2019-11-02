<template>
  <dl class="data-item">
    <dt class="data-item__name">{{name}}</dt>
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
// .data-item {
//   display: flex;
//   align-items: flex-end;
//   font-size: calc(12px + (26 - 12) * ((100vw - 300px) / (1600 - 300)));

//   &__name {
//     color: var(--color-main);
//     font-family: Calibri, Arial, sans-serif;
//     font-weight: bold;
//     margin-right: 0.25em;
//   }

//   &__value {
//     font-weight: bold;
//     font-size: 2.625em;
//     display: flex;
//   }
// }

// @media (min-width: 320px) {
//   .data-item {
//     font-size: 14px;
//   }
// }
</style>