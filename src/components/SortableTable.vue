<template>
  <table class="sortable-table">
    <thead>
      <tr class="sortable-table__row">
        <th
          :style="{'grid-template-columns': gridColumns}"
          class="sortable-table__heading sortable-table__cell"
          @click="$emit('sortTable', col)"
          :key="col"
          v-for="col in columns"
        >
          {{col}}
          <span></span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="sortable-table__row" :key="index" v-for="(obj, index) in data">
        <td class="sortable-table__data sortable-table__cell" :key="col" v-for="col in columns">
          <slot :column="col.toLowerCase()" :obj="obj">{{obj[col.toLowerCase()]}}</slot>
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
  @Prop() gridColumns!: string;
}
</script>

<style lang="scss" scoped>
.sortable-table {
  border-collapse: collapse;
  display: flex;
  flex-direction: column;

  thead,
  tbody {
    display: flex;
    flex-direction: column;
  }

  thead {
    border-bottom: solid 3px var(--color-main);
  }

  &__row {
    display: grid;
    width: 100%;

    &:not(:last-of-type) {
      margin-bottom: 1em;
    }
  }

  &__cell {
    text-align: left;
    vertical-align: bottom;
    padding: 1em 0.5em 0.5em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:last-of-type {
      text-align: right;
    }
  }

  &__heading {
    font-family: Calibri, Arial, sans-serif;
    font-size: 22px;
    color: var(--color-main);
  }

  &__data {
    color: white;
  }
}
</style>