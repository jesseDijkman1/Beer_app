<template>
  <div class="article-carousel">
    <div class="article-carousel__container">
      <div class="article-carousel__articles">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.article-carousel {
  &__container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 0.5rem;
  }

  &__articles {
    grid-column: 2 / 3;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-gap: 3em;
    overflow: scroll;
  }
}
</style>