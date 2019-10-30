<template>
  <button
    class="random-btn"
    @click="$router.push({name: 'detail', params: { id: randomId(), hasRandomId: true }})"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class RandomBeerButton extends Vue {
  randomId() {
    return Math.floor(Math.random() * 325) + 1;
  }
}
</script>

<style lang="scss" scoped>
.random-btn {
  font-family: Calibri, Arial, sans-serif;
  padding: 0.25em 0.5em;
  border: solid 2px var(--color-main);
  color: var(--color-main);
  font-size: 24px;
  border-radius: 0.25em;
  outline: none;
  transition: all 0.2s ease;
  background: none;
}

.random-btn:hover {
  // transform: scale(1.05)
  cursor: pointer;
  color: white;
  border-color: white;
}
</style>