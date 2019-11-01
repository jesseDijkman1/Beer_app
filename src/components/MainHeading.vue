<template>
  <h1 class="main-heading">
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.main-heading {
  color: var(--color-main);
  font-family: Calibri, Arial, sans-serif;
  font-size: 2.75rem;
}
</style>