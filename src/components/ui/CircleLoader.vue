<template>
  <div class="circle-loader"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.circle-loader {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  border: solid 5px var(--color-main);
  border-top: solid 5px transparent;
  border-bottom: solid 5px transparent;
  margin: 0 auto;
  animation: loading 0.5s ease infinite;
}

@keyframes loading {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(0.75);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}
</style>