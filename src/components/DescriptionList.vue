<template>
  <dl>
    <template>
      <dt></dt>
      <dd></dd>
    </template>
  </dl>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() name!: string;
  @Prop() value!: string | number;
}
</script>

<style lang="scss" scoped>
</style>