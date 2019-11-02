<template>
  <section class="grid-list">
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.grid-list {
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 1.5em;
}
</style>