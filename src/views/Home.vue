<template>
  <div>
    <h1>Home</h1>
    <vue-table v-if="beers !== undefined" v-bind:columns="columns">
      <vue-table-row v-bind:columns="columns" v-bind:key="beer.id" v-for="beer in correctBeersData">
        <vue-table-cell v-bind:style="{background: getColorFromEbc(beer.ebc)}" slot="color"></vue-table-cell>
        <vue-table-cell slot="id">{{beer.id}}</vue-table-cell>
        <vue-table-cell slot="name">{{beer.name}}</vue-table-cell>
        <vue-table-cell slot="description">{{beer.description}}</vue-table-cell>
        <vue-table-cell slot="ebc">{{beer.ebc}}</vue-table-cell>
      </vue-table-row>
    </vue-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VueTable from "@/components/vue-table.vue";
import VueTableRow from "@/components/vue-table-row.vue";
import VueTableCell from "@/components/vue-table-cell.vue";
import { BeerData } from "@/types";

import colorFromValue from "@/modules/color-scaler.ts";
import ebcColorScheme from "@/assets/ebc-color-scheme.ts";

@Component({
  components: {
    VueTable,
    VueTableRow,
    VueTableCell,
  },
})
export default class Home extends Vue {
  beers: any = [];
  columns: string[] = ["color", "id", "name", "ebc", "description"];

  async beforeCreate() {
    const page: number = new Date().getDate();
    const url: string = `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      this.beers = data;
    } catch (error) {
      throw new Error("API call failed!");
    }
  }

  getColorFromEbc(e: number) {
    return `rgb(${colorFromValue(e, ebcColorScheme)})`;
  }

  get correctBeersData(): BeerData[] {
    return this.beers.map(
      (beerObject: any): BeerData => {
        return {
          id: beerObject.id,
          name: beerObject.name,
          description: beerObject.description,
          ebc: beerObject.ebc,
        };
      }
    );
  }
}
</script>

<style lang="scss" scoped>
</style>