<template>
  <header class="beer-article-header">
    <h1 class="beer-article-header__title">{{title}}</h1>
    <p class="beer-article-header__tagline">{{tagline}}</p>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() title!: string;
  @Prop() tagline!: string;
}
</script>

<style lang="scss" scoped>
.beer-article-header {
  &__title {
    color: var(--color-main);
    font-family: Calibri, Arial, sans-serif;
    font-size: 3rem;
    transition: all 0.2s linear;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 80vw;
    overflow: hidden;
  }

  &__tagline {
    font-size: 1.25rem;
    display: flex;
    max-width: 80vw;
  }
}
</style>