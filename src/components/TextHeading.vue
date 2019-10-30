<template>
  <h1 :class="'heading--' + size">
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

type sizes = "large" | "medium" | "small";

@Component
export default class TextHeading extends Vue {
  @Prop() size: sizes = "large";
}
</script>

<style lang="scss" scoped>
.heading--large {
  font-size: 42px;
}

.heading--medium {
  font-size: 32px;
}

.heading--small {
  font-size: 24px;
}
</style>