<template>
  <h2 class="section-heading font-large">
    <slot></slot>
  </h2>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
// .section-heading {
//   color: white;
//   font-family: Calibri, Arial, sans-serif;
//   // font-size: 2.25rem;
//   text-align: center;
//   padding-bottom: 0.25em;
//   border-bottom: solid 2px var(--color-main);
// }
</style>