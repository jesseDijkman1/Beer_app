<template>
  <div class="articles-list">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ArticlesList extends Vue {}
</script>

<style lang="scss" scoped>
.articles-list {
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 3em;
}
</style>