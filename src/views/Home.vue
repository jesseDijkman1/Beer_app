<template>
  <div>
    <h1>Home</h1>
    <sorting-table v-bind:dataArray="correctBeersData"></sorting-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SortingTable from "@/components/SortingTable.vue";
import { BeerData } from "@/types";

@Component({
  components: {
    SortingTable,
  },
})
export default class Home extends Vue {
  beers: BeerData[] = [];

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

  get correctBeersData() {
    return this.beers.map(function(beerObject): BeerData {
      return {
        id: beerObject.id,
        name: beerObject.name,
        description: beerObject.description,
      };
    });
  }
}
</script>

<style lang="scss" scoped>
</style>