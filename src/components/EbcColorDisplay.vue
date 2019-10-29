<template>
  <div class="color-display" :style="{background: `rgb(${getColorFromEbc(ebc)})`}"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import colorScaler from "@/modules/color-scaler.ts";
import ebcColorScheme from "@/assets/ebc-color-scheme.ts";

@Component
export default class EbcColorDisplay extends Vue {
  @Prop() ebc!: number;

  getColorFromEbc: Function = colorScaler(ebcColorScheme);
}
</script>

<style lang="scss" scoped>
.color-display {
  width: 30px;
  height: 30px;
  border-radius: 100px;
}
</style>