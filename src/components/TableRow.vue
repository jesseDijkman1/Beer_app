<template>
  <tr>
    <template v-if="keys !== undefined">
      <th v-bind:key="key" v-for="key in keys">{{key}}</th>
    </template>
    <template v-else-if="data !== undefined">
      <td v-bind:key="key" v-for="(value, key) in data">{{value}}</td>
    </template>
  </tr>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class TableRow extends Vue {
  @Prop() data!: object;
  @Prop() keys!: string[] | number[];
}
</script>
