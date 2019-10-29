<template>
  <div>
    <h1>Home</h1>
    <sortable-table
      v-on:sortTable="setSorting"
      :data="beers"
      :columns="['color', 'id', 'name', 'ebc']"
    >
      <template slot-scope="{column, obj}">
        <ebc-color-display v-if="column == 'color'" :ebc="obj.ebc"></ebc-color-display>
        <router-link
          v-else-if="column == 'name'"
          :to="{name: 'detail', params: {id: obj.id, data: obj}}"
        >{{obj.name}}</router-link>
      </template>
    </sortable-table>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import SortableTable from "@/components/SortableTable.vue";
import EbcColorDisplay from "@/components/EbcColorDisplay.vue";
import RandomBeerButton from "@/components/RandomBeerButton.vue";

@Component({
  components: {
    SortableTable,
    EbcColorDisplay,
  },
})
export default class Home extends Vue {
  beers: object[] = [];
  sortingKey: string = "id";
  ascending: boolean = true;

  async getBeers(url: string) {
    try {
      const response = await fetch(url);

      return Promise.resolve(await response.json());
    } catch (error) {
      throw new Error("API call failed!");
    }
  }

  async created() {
    const page: number = new Date().getDate();
    const url: string = `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`;

    this.beers = await this.getBeers(url);

    this.sortBeers();
  }

  setSorting(key: string) {
    if (key === this.sortingKey) {
      this.ascending = !this.ascending;
    } else {
      this.ascending = true;
      this.sortingKey = key;
    }
  }

  // Watch two values at once (seems to work)
  @Watch("sortingKey")
  @Watch("ascending")
  fn() {
    this.sortBeers();
  }

  sortBeers() {
    this.beers.sort((_a: any, _b: any) => {
      let b: string | number = _b[this.sortingKey];
      let a: string | number = _a[this.sortingKey];

      if (a > b) {
        return this.ascending ? 1 : -1;
      }

      if (b > a) {
        return this.ascending ? -1 : 1;
      }

      return 0;
    });
  }
}
</script>

<style lang="scss" scoped>
</style>