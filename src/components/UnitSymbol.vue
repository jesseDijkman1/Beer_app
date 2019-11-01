<template>
  <span class="unit-symbol">{{unitSymbol}}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ default: "" }) unit!: string;

  get unitSymbol() {
    switch (this.unit) {
      case "percentage":
        return "%";
      case "litres":
        return "l";
      case "kilograms":
        return "kg";
      case "grams":
        return "g";
      case "celsius":
        return "\xB0C";
      default:
        return "";
    }
  }
}
</script>

<style lang="scss" scoped>
.unit-symbol {
  font-size: 0.4em;
  align-self: flex-end;
  margin-bottom: 0.5em;
}
</style>