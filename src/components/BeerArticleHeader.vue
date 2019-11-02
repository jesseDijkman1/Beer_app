<template>
  <header class="beer-article-header">
    <h1 class="beer-article-header__title font-large">{{title}}</h1>
    <p class="beer-article-header__tagline font-regular">{{tagline}}</p>
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
  }
}
</style>