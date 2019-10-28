<template>
  <div>
    <h1>Home</h1>
    <sortable-table
      v-on:sortTable="setSorting"
      :data="beers"
      :columns="['color', 'id', 'name', 'ebc']"
    >
      <template slot-scope="{column, obj}">
        <div
          v-if="column == 'color'"
          class="color-display"
          :style="{background: getColorFromEbc(obj.ebc)}"
        ></div>

        <router-link v-else-if="column == 'name'" :to="`/beers/${obj.id}`">{{obj.name}}</router-link>
      </template>
    </sortable-table>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import SortableTable from "@/components/SortableTable.vue";

import colorFromValue from "@/modules/color-scaler.ts";
import ebcColorScheme from "@/assets/ebc-color-scheme.ts";

@Component({
  components: {
    SortableTable,
  },
})
export default class Home extends Vue {
  beers: object[] = [];
  sortingKey: string = "id";
  ascending: boolean = true;

  async beforeCreate() {
    const page: number = new Date().getDate();
    const url: string = `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`;

    try {
      const response = await fetch(url);

      this.beers = await response.json();

      console.log(this.beers);
      this.sortBeers();
    } catch (error) {
      throw new Error("API call failed!");
    }
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

  getColorFromEbc(e: number) {
    return `rgb(${colorFromValue(e, ebcColorScheme)})`;
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