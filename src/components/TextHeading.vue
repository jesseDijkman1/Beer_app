<template>
  <h1 v-if="size === 'large'" class="heading heading--large">
    <slot></slot>
  </h1>
  <h2 v-else-if="size === 'medium'" class="heading heading--medium">
    <slot></slot>
  </h2>
  <h3 v-else-if="size == 'small'" class="heading heading--small">
    <slot></slot>
  </h3>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

type sizes = "large" | "medium" | "small";

@Component
export default class TextHeading extends Vue {
  @Prop({ default: "large" }) size!: sizes;
}
</script>

<style lang="scss" scoped>
.heading {
  color: white;

  &--large {
    font-size: 42px;
    font-weight: normal;
  }

  &--medium {
    font-size: 32px;
    font-weight: 600;
  }

  &--small {
    font-size: 24px;
  }
}
</style>