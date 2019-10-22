<template>
  <table>
    <tr>
      <th v-bind:key="id" v-for="(n, id) in Object.keys(dataArray[0])">{{n}}</th>
    </tr>
    <tr v-bind:key="beer.id" v-for="beer in dataArray">
      <td>{{beer.id}}</td>
      <td>{{beer.name}}</td>
      <td>{{beer.description}}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class SortingTable extends Vue {
  @Prop() dataArray!: any[];
}
</script>