<template>
  <div>
    <h1>All Beers</h1>
    <sortable-table :data="beers" :columns="['color', 'id', 'name', 'ebc']">
      <template slot-scope="{column, obj}">
        <ebc-color-display v-if="column == 'color'" :ebc="obj.ebc"></ebc-color-display>
        <router-link
          v-else-if="column == 'name'"
          :to="{name: 'detail', params: {id: obj.id, data: obj}}"
        >{{obj.name}}</router-link>
      </template>
    </sortable-table>
    <footer-pagination
      url="/beers/"
      :currentPage="page"
      :perPage="25"
      :totalEntries="325"
      :maxLength="8"
    ></footer-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import SortableTable from "@/components/SortableTable.vue";
import EbcColorDisplay from "@/components/EbcColorDisplay.vue";
import FooterPagination from "@/components/FooterPagination.vue";

@Component({
  components: {
    SortableTable,
    EbcColorDisplay,
    FooterPagination,
  },
})
export default class List extends Vue {
  perPage: number = 25;

  beers: object[] = [];

  @Prop({ default: 1 }) page!: number;

  async getBeers(url: string) {
    try {
      const response = await fetch(url);

      return Promise.resolve(await response.json());
    } catch (error) {
      throw new Error("API call failed!");
    }
  }

  get url() {
    return `https://api.punkapi.com/v2/beers?page=${this.page}&per_page=${this.perPage}`;
  }

  @Watch("page", { immediate: true })
  async fn() {
    // Maybe should store the data somewhere else, like localstorage
    this.beers = await this.getBeers(this.url);
  }
}
</script>

<style lang="scss" scoped>
</style>