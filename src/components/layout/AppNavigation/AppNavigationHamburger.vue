<template>
  <div class="hamburger">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.hamburger {
  height: 1.5em;
  width: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;

  &:hover {
    cursor: pointer;
  }

  span {
    transition: all 0.3s ease;
    height: 2px;
    background: var(--color-main);
  }

  &.is-open {
    span {
      background: white;
    }
  }
}
</style>