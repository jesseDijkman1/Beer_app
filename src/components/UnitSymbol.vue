<template>
  <span>{{unitSymbol}}</span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

type units = "percentage" | "litres" | "kilograms" | "grams" | "celsius";

@Component
export default class extends Vue {
  @Prop() unit!: string;

  get unitSymbol() {}
}
</script>