<template>
  <h2 class="section-heading font-large">
    <slot></slot>
  </h2>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//
@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.section-heading {
  color: var(--color-main);
  font-family: Calibri, Arial, sans-serif;
  border-bottom: solid 2px white;
  margin-bottom: 0.5em;
  padding-bottom: 0.25em;

  &--small {
    font-size: 0.8em;
  }
}
</style>