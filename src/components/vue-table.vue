<template>
  <table>
    <thead>
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
  @Prop() columns!: string[];
}
</script>