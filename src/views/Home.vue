<template>
  <div class="grid-base">
    <div class="home-header">
      <main-heading>For the brewers</main-heading>

      <random-beer-button>Random Beer</random-beer-button>

      <span>&#8609;</span>
    </div>

    <section-heading>Beers of the day</section-heading>

    <sorting-handler
      @sortBy="setSorting"
      :options="['name', 'ebc', 'ibu', 'abv']"
      :style="{alignSelf: 'flex-end'}"
    >Sort</sorting-handler>

    <grid-list>
      <beer-article-card
        v-for="beer in beers"
        :key="beer.id"
        :id="beer.id"
        :name="beer.name"
        :tagline="beer.tagline"
        :abv="beer.abv"
        :ebc="beer.ebc"
        :ibu="beer.ibu"
        @click.native="$router.push({name:'detail', params:{'id': beer.id}})"
      ></beer-article-card>
    </grid-list>

    <strong>
      <router-link to="/beers/1">> See all beers</router-link>
    </strong>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";

import RandomBeerButton from "@/components/RandomBeerButton.vue";

import MainHeading from "@/components/headings/MainHeading.vue";
import SectionHeading from "@/components/headings/SectionHeading.vue";

import BeerArticleCard from "@/components/BeerArticleCard.vue";
import GridList from "@/components/GridList.vue";
import SearchBar from "@/components/SearchBar.vue";
import SortingHandler from "@/components/SortingHandler.vue";

@Component({
  components: {
    BeerArticleCard,
    RandomBeerButton,
    SectionHeading,
    GridList,
    SortingHandler,
    SearchBar,
    MainHeading,
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

  search(value: string) {
    if (!value) {
      console.log("Reset");
    }
  }
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

@keyframes verticalPendulum {
  0% {
    transform: translateY(-0.2em);
  }
  100% {
    transform: translateY(0.2em);
  }
}
// h1 {
//   color: white;
// }

// .grid-home {
//   border: solid 1px red;
// }

// strong {
//   color: var(--color-main);
// }

// .list-seperator {
//   display: grid;
//   grid-auto-flow: column;
//   grid-gap: 2em;
//   height: 1px;
//   width: 50%;
//   opacity: 0.5;

//   &:last-of-type {
//     display: none;
//   }

//   &:nth-of-type(odd) {
//     transform: scaleX(-1); // Flip horizontally
//   }

//   span {
//     &:nth-child(odd) {
//       background: white;
//     }
//     &:nth-child(even) {
//       background: var(--color-main);
//     }
//   }
// }

// .flex-wrapper--column {
//   display: flex;
//   flex-direction: column;
// }

// .list-controls {
//   background: blue;
// }
</style>