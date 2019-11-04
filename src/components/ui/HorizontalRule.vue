<template>
  <hr class="horizontal-rule" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.horizontal-rule {
  display: block;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    white 50%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.2;
}
</style>