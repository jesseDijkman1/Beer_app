<template>
  <dl class="data-group-list">
    <template v-for="({title, value, unit}, index) in dataList">
      <dt :key="'dt-' + index" class="data-group-list__title">{{title}}</dt>
      <dd :key="'dd-' + index" class="data-group-list__value">
        {{value}}
        <unit-symbol :unit="unit" />
      </dd>
    </template>
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
  @Prop() data!: object[];

  get dataList() {
    if (Array.isArray(this.data)) {
      return this.data;
    } else {
      return [this.data];
    }
  }
}
</script>

<style lang="scss" scoped>
// .data-group-list {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   width: 100%;
//   border: solid 1px var(--color-main);
//   padding: 0.5em 1em;

//   &__title,
//   &__value {
//     align-self: center;
//   }

//   &__title {
//     justify-self: start;
//     color: var(--color-main);
//     font-family: Calibri, Arial, sans-serif;
//     font-weight: bold;
//   }

//   &__value {
//     justify-self: end;
//     font-size: 1.25em;

//     .unit-symbol {
//       font-size: 0.8em;
//     }
//   }
// }
</style>