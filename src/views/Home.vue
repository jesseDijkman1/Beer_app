<template>
  <div>
    <h1>Home</h1>
    <sortable-table v-on:sortTable="setSorting" :data="correctBeersData" :columns="columns">
      <template slot-scope="{column, obj}">
        <div
          v-if="column == 'color'"
          class="color-display"
          :style="{background: getColorFromEbc(obj.ebc)}"
        ></div>
      </template>
    </sortable-table>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import SortableTable from "@/components/SortableTable.vue";
import { BeerData } from "@/types";

import colorFromValue from "@/modules/color-scaler.ts";
import ebcColorScheme from "@/assets/ebc-color-scheme.ts";

@Component({
  components: {
    VueTable,
    VueTableRow,
    VueTableCell,
    SortableTable,
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
.color-display {
  width: 30px;
  height: 30px;
  border-radius: 100px;
}
</style>