<template>
  <dl class="description-list">
    <template v-for="(d, i) in data">
      <dt class="description-list__title font-small" :key="'t-' + i">{{d.title}}</dt>
      <dd class="description-list__value font-regular" :key="'d' + i">{{d.value}}</dd>
    </template>
  </dl>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() data!: object[];
}
</script>

<style lang="scss" scoped>
.description-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 0.5em;
  align-items: center;
  padding: 0 0.5em;

  &__title {
    font-family: Calibri, Arial, sans-serif;
    color: var(--color-main);
    font-weight: bold;
    justify-self: start;
  }
  &__value {
    justify-self: end;
  }
}
</style>