<template>
  <span class="list-seperator"></span>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.list-seperator {
  display: flex;
  align-items: stretch;
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