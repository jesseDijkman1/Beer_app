<template>
  <div class="color-display" :style="{backgroundColor: `rgb(${getColorFromEbc(ebc)})`}"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import colorScaler from "@/modules/color-scaler.ts";
import ebcColorScheme from "@/assets/ebc-color-scheme.ts";

@Component
export default class extends Vue {
  @Prop({ type: Number }) private readonly ebc!: number;

  private getColorFromEbc: (value: number) => void = colorScaler(
    ebcColorScheme
  );
}
</script>

