<template>
  <div class="main-grid">
    <h1>All Beers</h1>
    <search-bar @search="search" :autoSearch="true" :delay="500" placeholder="Search beer ..."></search-bar>
    <grid-list>
      <template v-for="beer in beers">
        <beer-article-card
          :key="beer.id"
          :id="beer.id"
          :name="beer.name"
          :tagline="beer.tagline"
          :alcohol="beer.abv"
          :ebc="beer.ebc"
          :ibu="beer.ibu"
          @click.native="$router.push({name:'detail', params:{'id': beer.id}})"
        ></beer-article-card>

        <span :key="'ignore' + beer.id" class="list-seperator">
          <span></span>
          <span></span>
        </span>
      </template>
    </grid-list>
    <footer-pagination
      v-if="isSearched == false"
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
import BeerArticleCard from "@/components/BeerArticleCard.vue";
import GridList from "@/components/GridList.vue";
import SearchBar from "@/components/SearchBar.vue";
import FooterPagination from "@/components/FooterPagination.vue";

@Component({
  components: {
    FooterPagination,
    BeerArticleCard,
    GridList,
    SearchBar,
  },
})
export default class List extends Vue {
  @Prop({ default: 1 }) page!: number;

  perPage: number = 25;
  beers: object[] = [];
  isSearched: boolean = false;

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

  async search(value: string) {
    /**
     * Weird Bug:
     * When deleting the input value at the same time it starts searching can get you stuck*/

    if (!value && this.isSearched) {
      this.isSearched = false;
      this.beers = await this.getBeers(this.url);
    } else if (value) {
      const url = `https://api.punkapi.com/v2/beers?beer_name=${value}&per_page=80`;

      this.isSearched = true;
      this.beers = await this.getBeers(url);
    }
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