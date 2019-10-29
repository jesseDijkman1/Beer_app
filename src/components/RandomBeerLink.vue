<template>
  <router-link @click.native="setRandomId" :to="{name: 'random', params: { id }}">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class RandomBeerLink extends Vue {
  id!: number;

  setRandomId() {
    this.id = Math.floor(Math.random() * 325) + 1;
  }
}
</script>