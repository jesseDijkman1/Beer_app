<template>
  <router-link @click.native="setRandomId" :to="{name: 'detail', params:{id, hasRandomId: true}}">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class RandomBeerLink extends Vue {
  id: number = Math.floor(Math.random() * 325) + 1;

  setRandomId() {
    console.log("generate new random");
    this.id = Math.floor(Math.random() * 325) + 1;
  }
}
</script>