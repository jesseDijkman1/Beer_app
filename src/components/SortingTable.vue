<template>
  <table>
    <thead>
      <table-row v-bind:keys="Object.keys(dataArray[0])"></table-row>
    </thead>
    <tbody>
      <table-row v-bind:key="data.id" v-bind:data="data" v-for="data in dataArray"></table-row>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import TableRow from "./TableRow.vue";

@Component({
  components: {
    TableRow,
  },
})
export default class SortingTable extends Vue {
  @Prop() dataArray!: any[];
}
</script>