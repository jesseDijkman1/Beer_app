<template>
  <button @click="$router.push({name: 'detail', params: { id: randomId(), hasRandomId: true }})">
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