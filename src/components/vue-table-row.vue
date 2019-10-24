<template>
  <tr>
    <template v-for="column in columns">
      <slot v-bind:name="column"></slot>
    </template>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VueTable extends Vue {
  @Prop() columns!: string[];
}
</script>