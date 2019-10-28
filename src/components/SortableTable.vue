<template>
  <table>
    <thead>
      <tr>
        <th @click="$emit('sortTable', col)" :key="col" v-for="col in columns">{{col}}</th>
      </tr>
    </thead>
    <tbody>
      <tr :key="index" v-for="(obj, index) in data">
        <td :key="col" v-for="col in columns">
          <slot :column="col" :obj="obj">{{obj[col]}}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SortingTable extends Vue {
  @Prop() data!: object[];
  @Prop() columns!: string[];
}
</script>