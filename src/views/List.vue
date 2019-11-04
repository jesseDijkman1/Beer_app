<template>
  <div class="grid-base">
    <main-heading>All beers</main-heading>
    <search-bar
      @search="search"
      @reset="reset"
      :searching="loading"
      :autoSearch="true"
      :delay="500"
      placeholder="Search beer ..."
    ></search-bar>

    <sorting-handler
      @sortBy="setSorting"
      :options="['name', 'ebc', 'ibu', 'abv']"
      class="grid-width"
      :style="{alignSelf: 'flex-end'}"
    >Sort</sorting-handler>

    <circle-loader v-show="loading"></circle-loader>

    <h1 class="search-result--empty" v-if="!loading && beers.length == 0">No beers found</h1>

    <grid-list v-show="!loading">
      <template v-for="beer in beers">
        <beer-article-card
          :key="beer.id"
          :id="beer.id"
          :name="beer.name"
          :tagline="beer.tagline"
          :abv="beer.abv"
          :ebc="beer.ebc"
          :ibu="beer.ibu"
          @click.native="$router.push({name:'detail', params:{'id': beer.id}})"
        ></beer-article-card>
        <horizontal-rule :key="'seperator-'+ beer.id" />
      </template>
    </grid-list>

    <footer-pagination
      v-if="isSearched == false"
      url="/beers/"
      :currentPage="page"
      :perPage="25"
      :totalEntries="325"
      :maxLength="5"
    ></footer-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";

import { APIData } from "@/types";

import fetcher from "@/modules/fetcher.ts";

import BeerArticleCard from "@/components/card/BeerCard.vue";
import HorizontalRule from "@/components/ui/HorizontalRule.vue";
import GridList from "@/components/layout/GridList.vue";
import SearchBar from "@/components/controllers/SearchBar.vue";
import FooterPagination from "@/components/controllers/FooterPagination.vue";
import CircleLoader from "@/components/ui/CircleLoader.vue";
import SortingHandler from "@/components/controllers/SortingHandler.vue";
import MainHeading from "@/components/ui/MainHeading.vue";

@Component({
  components: {
    FooterPagination,
    BeerArticleCard,
    GridList,
    SearchBar,
    CircleLoader,
    SortingHandler,
    MainHeading,
    HorizontalRule,
  },
})
export default class List extends Vue {
  @Prop({ default: 1 }) private readonly page!: number;

  private readonly perPage: number = 25;
  private beers: APIData[] | any = [];
  private isSearched: boolean = false;
  private loading: boolean = false;

  private sortingKey: string = "id";
  private ascending: boolean = true;

  private blockReset: boolean = false;

  get url(): string {
    return `https://api.punkapi.com/v2/beers?page=${this.page}&per_page=${this.perPage}`;
  }

  async reset(): Promise<void> {
    this.loading = true;

    if (!this.blockReset) {
      this.blockReset = true;

      this.beers = await fetcher(this.url);
    }

    this.loading = false;
  }

  async search(value: string): Promise<void> {
    this.blockReset = false;

    if (value) {
      const url: string = `https://api.punkapi.com/v2/beers?beer_name=${value}&per_page=80`;

      this.loading = true;

      this.beers = await fetcher(url);

      this.loading = false;
    }
  }

  @Watch("page", { immediate: true })
  async fn(): Promise<void> {
    // Maybe should store the data somewhere else, like localstorage
    this.beers = await fetcher(this.url);
  }

  setSorting(key: string): void {
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
  fn2(): void {
    this.sortBeers();
  }

  sortBeers(): void {
    this.beers.sort((_a: APIData | any, _b: APIData | any) => {
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
.search-result--empty {
  font-size: calc(40px + (100 - 40) * ((100vw - 300px) / (1600 - 300)));
  text-align: center;
  opacity: 0.5;
}
</style>