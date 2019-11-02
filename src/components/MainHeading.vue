<template>
  <h1 class="main-heading font-huge">
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
// .main-heading {
//   color: white;
//   font-family: Calibri, Arial, sans-serif;
//   margin: 1em 0;
// }
</style>