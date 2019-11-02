<template>
  <section class="grid-list" :class="{'grid-list--multiple': multipleColumns}">
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ default: false }) multipleColumns!: boolean;
}
</script>

<style lang="scss" scoped>
.grid-list {
  display: grid;
  grid-auto-rows: auto;
  grid-row-gap: 1.5em;
}

.grid-list--multiple {
  display: grid;
  grid-template-columns: auto;
  grid-auto-rows: auto;
  grid-gap: 1.5em;
}

@media (min-width: 700px) {
  .grid-list--multiple {
    grid-template-columns: 1fr 1fr;
  }
}
</style>