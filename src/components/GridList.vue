<template>
  <section class="articles-list">
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class GridList extends Vue {}
</script>

<style lang="scss" scoped>
.articles-list {
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 3em;
}
</style>