<template>
  <dl class="description-list">
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

import UnitSymbol from "@/components/ui/UnitSymbol.vue";

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