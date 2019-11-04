<template>
  <button @click="$emit('click')" class="button font-medium">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.button {
  color: var(--color-main);
  border: solid 1px var(--color-main);
  background: none;
  padding: 0.25em 0.5em;
  border-radius: 0.25em;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    color: white;
    border-color: white;
  }
}
</style>

