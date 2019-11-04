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

import UnitSymbol from "@/components/ui/UnitSymbol.vue";

@Component({
  components: {
    UnitSymbol,
  },
})
export default class extends Vue {
  @Prop({ type: String }) private readonly name!: string;
  @Prop({ type: [String, Number] }) private readonly value!:
    | number
    | string
    | null;
  @Prop({ default: "", type: String }) private readonly unit!: string;
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
    margin-right: 0.5em;
  }

  &__value {
    font-size: calc(18px + (40 - 18) * ((100vw - 320px) / (1600 - 320)));
    font-weight: bold;
    margin-bottom: 0.25em;
    display: flex;
  }
}
</style>