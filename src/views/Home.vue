<template>
  <div>
    <text-heading size="large">For the alcoholics</text-heading>

    <random-beer-button>Random Beer</random-beer-button>

    <section>
      <text-heading size="medium">Beers of the day</text-heading>

      <articles-list>
        <template v-for="beer in beers">
          <beer-article-card
            :key="beer.id"
            :id="beer.id"
            :name="beer.name"
            :tagline="beer.tagline"
            :alcohol="beer.abv"
            :ebc="beer.ebc"
            :ibu="beer.ibu"
          ></beer-article-card>

          <span :key="beer.id" class="list-seperator">
            <span></span>
            <span></span>
          </span>
        </template>
      </articles-list>
    </section>

    <strong>
      <router-link to="/beers/1">> See all beers</router-link>
    </strong>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
// import SortableTable from "@/components/SortableTable.vue";

import RandomBeerButton from "@/components/RandomBeerButton.vue";
import TextHeading from "@/components/TextHeading.vue";
import BeerArticleCard from "@/components/BeerArticleCard.vue";
import ArticlesList from "@/components/ArticlesList.vue";

@Component({
  components: {
    BeerArticleCard,
    RandomBeerButton,
    TextHeading,
    ArticlesList,
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
h1 {
  color: white;
}

.grid-home {
  border: solid 1px red;
}

strong {
  color: var(--color-main);
}

.list-seperator {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2em;
  height: 1px;
  width: 50%;
  opacity: 0.5;

  &:nth-of-type(odd) {
    transform: scaleX(-1); // Flip horizontally
  }

  span {
    &:nth-child(odd) {
      background: white;
    }
    &:nth-child(even) {
      background: var(--color-main);
    }
  }
}
</style>