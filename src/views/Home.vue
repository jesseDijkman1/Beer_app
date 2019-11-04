<template>
  <div class="grid-base">
    <header class="home-header">
      <main-heading>For the brewers</main-heading>

      <random-beer-button>Random Beer</random-beer-button>

      <span>&#8609;</span>
    </header>

    <section-heading>Beers of the day</section-heading>

    <sorting-handler
      @sortBy="setSorting"
      :options="['name', 'ebc', 'ibu', 'abv']"
      :style="{alignSelf: 'flex-end'}"
    >Sort</sorting-handler>

    <grid-list>
      <template v-for="beer in beers">
        <beer-card
          :key="beer.id"
          :id="beer.id"
          :name="beer.name"
          :tagline="beer.tagline"
          :abv="beer.abv"
          :ebc="beer.ebc"
          :ibu="beer.ibu"
          @click.native="$router.push({name:'detail', params:{'id': beer.id}})"
        ></beer-card>

        <horizontal-rule :key="'seperator-' + beer.id" />
      </template>
    </grid-list>

    <strong>
      <app-navigation-link url="/beers/1">> See all beers</app-navigation-link>
    </strong>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";

import { APIData } from "@/types";

import fetcher from "@/modules/fetcher.ts";
import sorter from "@/modules/sorting.ts";

import RandomBeerButton from "@/components/ui/RandomBeerButton.vue";
import AppNavigationLink from "@/components/layout/AppNavigation/AppNavigationLink.vue";
import MainHeading from "@/components/ui/MainHeading.vue";
import SectionHeading from "@/components/ui/SectionHeading.vue";
import HorizontalRule from "@/components/ui/HorizontalRule.vue";
import BeerCard from "@/components/card/BeerCard.vue";
import GridList from "@/components/layout/GridList.vue";
import SearchBar from "@/components/controllers/SearchBar.vue";
import SortingHandler from "@/components/controllers/SortingHandler.vue";

@Component({
  components: {
    BeerCard,
    RandomBeerButton,
    SectionHeading,
    GridList,
    SortingHandler,
    SearchBar,
    MainHeading,
    HorizontalRule,
    AppNavigationLink,
  },
})
export default class extends Vue {
  private beers: APIData[] | any = [];

  private sortingKey: string = "id";
  private ascending: boolean = true;

  private async created(): Promise<void> {
    const page: number = new Date().getDate();
    const url: string = `https://api.punkapi.com/v2/beers?page=${page}&per_page=10`;

    this.beers = await fetcher(url);

    sorter<APIData>(this.beers, this.sortingKey, this.ascending);
  }

  private setSorting(key: string): void {
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
  private fn(): void {
    sorter<APIData>(this.beers, this.sortingKey, this.ascending);
  }

  // private sortBeers(): void {
  //   this.beers.sort((_a: APIData | any, _b: APIData | any) => {
  //     const b: string | number = _b[this.sortingKey];
  //     const a: string | number = _a[this.sortingKey];

  //     if (a > b) {
  //       return this.ascending ? 1 : -1;
  //     }

  //     if (b > a) {
  //       return this.ascending ? -1 : 1;
  //     }

  //     return 0;
  //   });
  // }
}
</script>

<style lang="scss" scoped>
.home-header {
  display: flex;
  flex-direction: column;

  padding-top: 25vh;
  align-items: center;
  height: 100vh;

  span {
    margin-top: 5vh;
    opacity: 0.5;
    color: var(--color-main);
    font-size: 100px;

    animation: verticalPendulum 0.5s ease-in-out infinite alternate;
  }
}

strong {
  text-align: center;
  margin-top: 1em;
}

@keyframes verticalPendulum {
  0% {
    transform: translateY(-0.2em);
  }
  100% {
    transform: translateY(0.2em);
  }
}
</style>