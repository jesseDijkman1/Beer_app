<template >
  <table>
    <thead v-if="columns !== undefined">
      <tr>
        <th v-bind:key="column" v-for="column in columns">{{column}}</th>
      </tr>
    </thead>

    <tbody>
      <slot></slot>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VueTable extends Vue {
  @Prop({ default: undefined }) columns!: string[];
}
</script>

<style scoped>
* {
  border: solid 1px black;
}
</style>