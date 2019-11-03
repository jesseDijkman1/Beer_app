<template>
  <div class="beer-page grid-base">
    <random-beer-button class="beer-page__random-button" v-if="hasRandomId">Random Beer!</random-beer-button>

    <header class="beer-page__header">
      <main-heading class="beer-page__name">{{beer.name}}</main-heading>
      <p class="beer-page__tagline font-medium">{{beer.tagline}}</p>
    </header>

    <grid-list :multiple-columns="true">
      <p class="beer-page__description font-regular">{{beer.description}}</p>

      <section class="beer-page__section beer-page__section--data">
        <data-item name="ABV" :value="beer.abv" />
        <data-item name="IBU" :value="beer.ibu" />
        <data-item name="EBC" :value="beer.ebc" />
        <data-item name="FG" :value="beer.target_fg" />
        <data-item name="OG" :value="beer.target_og" />
        <data-item name="SRM" :value="beer.srm" />
        <data-item name="PH" :value="beer.ph" />
      </section>
    </grid-list>

    <section-heading>Method</section-heading>

    <section class="beer-page__section beer-page__section--method">
      <grid-list :multiple-columns="true">
        <beer-method-card :data="methodData.mash_temp">Mash Temperature</beer-method-card>
        <beer-method-card :data="methodData.fermentation">Fermentation</beer-method-card>
        <beer-method-card :data="methodData.twist">Twist</beer-method-card>
      </grid-list>
    </section>

    <section-heading>Ingredients</section-heading>

    <section class="beer-page__section beer-page__section--ingredients">
      <grid-list>
        <div class="ingredient-category">
          <h3 class="ingredient-category__title font-medium">Malt</h3>
          <grid-list :multiple-columns="true">
            <div
              class="ingredient-card"
              :key="'malt-'+index"
              v-for="(malt, index) in ingredientData.malt"
            >
              <description-list :data="malt" />
            </div>
          </grid-list>
        </div>

        <div class="ingredients-category">
          <h3 class="ingredient-category__title font-medium">Hops</h3>
          <grid-list :multiple-columns="true">
            <div
              class="ingredient-card"
              :key="'hops-'+index"
              v-for="(hops, index) in ingredientData.hops"
            >
              <description-list :data="hops" />
            </div>
          </grid-list>
        </div>

        <div class="ingredients-category">
          <h3 class="ingredient-category__title font-medium">Yeast</h3>
          <grid-list>
            <div class="ingredient-card">
              <p class="font-regular">{{ingredientData.yeast}}</p>
            </div>
          </grid-list>
        </div>
      </grid-list>
    </section>

    <section-heading>Food Pairing</section-heading>

    <section class="beer-page__section beer-page__section--food-pairing">
      <grid-list class="food-pairing-list">
        <p
          class="food-pairing-list__item font-medium"
          :key="'food-' + index"
          v-for="(food, index) in beer.food_pairing"
        >{{food}}</p>
      </grid-list>
    </section>

    <section class="beer-page__section beer-page__section--suggestions full-width">
      <section-heading class="beer-page__section--suggestions__title">Similar Beers</section-heading>

      <beer-article-carousel :items="3">
        <beer-article-card
          v-for="(beer, index) in suggestions"
          class="beer-page__section--suggestions__card"
          :colorDisplay="false"
          :slot="'item-' + (index + 1)"
          :key="beer.id"
          :id="beer.id"
          :name="beer.name"
          :tagline="beer.tagline"
          :abv="beer.abv"
          :ebc="beer.ebc"
          :ibu="beer.ibu"
          @click.native="$router.push({name:'detail', params:{'id': beer.id}})"
        ></beer-article-card>
      </beer-article-carousel>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import RandomBeerButton from "@/components/RandomBeerButton.vue";
import DataGroupList from "@/components/DataGroupList.vue";

import GridList from "@/components/GridList.vue";
import ListItemSeperator from "@/components/ListItemSeperator.vue";

import BeerArticleCard from "@/components/BeerArticleCard.vue";
import BeerArticleCarousel from "@/components/BeerArticleCarousel.vue";

import MainHeading from "@/components/headings/MainHeading.vue";
import SectionHeading from "@/components/headings/SectionHeading.vue";

import BeerMethodCard from "@/components/BeerMethodCard.vue";
import DescriptionList from "@/components/DescriptionList.vue";

import DataItem from "@/components/DataItem.vue";

@Component({
  components: {
    RandomBeerButton,
    DataGroupList,
    MainHeading,
    DataItem,
    SectionHeading,
    BeerMethodCard,
    DescriptionList,
    GridList,
    ListItemSeperator,
    BeerArticleCard,
    BeerArticleCarousel,
  },
})
export default class Detail extends Vue {
  @Prop() id!: number | boolean;
  @Prop() data!: object | undefined;
  @Prop({ default: false }) hasRandomId!: boolean;

  beer: object = {};

  suggestions: object[] = [];

  methodData: object = {};
  ingredientData: object = {};

  @Watch("id", { immediate: true })
  async fn() {
    if (this.data == undefined) {
      try {
        const response = await fetch(this.apiUrl);

        this.beer = (await response.json())[0];
      } catch (error) {
        throw new Error("API call failed!");
      }
    } else {
      this.beer = this.data;
    }
  }

  fetcher(url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url);
        const results = await response.json();

        resolve(results);
      } catch (error) {
        throw new Error("API call failed!");
      }
    });
  }

  async getSuggestions(data: object) {
    const baseUrl = "https://api.punkapi.com/v2/beers/";
    const map = new Map();

    // // First try to get enough suggestions based on the food pairings

    for (let food of data.food_pairing) {
      const results: any = await this.fetcher(`${baseUrl}?food=${food}`);

      for (let result of results) {
        if (map.size == 3) {
          break;
        }

        if (data.id !== result.id) {
          map.set(result.id, result);
        }
      }
    }

    if (map.size < 3) {
      // If the food pairings didn't get enough suggestions, use the IBU (bitterness)
      const findMatchingIbu = async (range: number) => {
        const results: any = await this.fetcher(
          `${baseUrl}?ibu_gt=${data.ibu - range}&ibu_lt=${data.ibu + range}`
        );

        for (let result of results) {
          if (map.size == 3) break;

          if (data.id !== result.id) {
            map.set(result.id, result);
          }
        }

        if (map.size < 3) {
          // Afraid this might clash with the API ratelimit
          return findMatchingIbu(range + 10);
        }
      };
      await findMatchingIbu(1);
    }

    return Array.from(map.values());
  }

  get apiUrl(): string {
    return `https://api.punkapi.com/v2/beers/${this.id}`;
  }

  @Watch("beer")
  async fn2() {
    this.methodData = this.createMethodData(this.beer);
    this.ingredientData = this.createIngredientData(this.beer);
    this.suggestions = await this.getSuggestions(this.beer);
  }

  createMethodData(data) {
    return {
      mash_temp: [
        {
          title: "Temperature",
          value: data.method.mash_temp[0].temp.value,
          unit: data.method.mash_temp[0].temp.unit,
        },
        {
          title: "Duration",
          value: data.method.mash_temp[0].duration,
          unit: "",
        },
      ],
      fermentation: [
        {
          title: "Temperature",
          value: data.method.fermentation.temp.value,
          unit: data.method.fermentation.temp.unit,
        },
      ],
      twist: data.method.twist || "None",
    };
  }

  createIngredientData(data) {
    return {
      malt: data.ingredients.malt.map(malt => {
        return [
          {
            title: "Name",
            value: malt.name,
            unit: "",
          },
          {
            title: "Amount",
            value: malt.amount.value,
            unit: malt.amount.unit,
          },
        ];
      }),
      hops: data.ingredients.hops.map(hops => {
        return [
          {
            title: "Name",
            value: hops.name,
            unit: "",
          },
          {
            title: "Amount",
            value: hops.amount.value,
            unit: hops.amount.unit,
          },
          {
            title: "Add",
            value: hops.add,
            unit: "",
          },
          {
            title: "Attribute",
            value: hops.attribute,
            unit: "",
          },
        ];
      }),
      yeast: data.ingredients.yeast || "",
    };
  }
}
</script>

<style lang="scss" scoped>
.beer-page {
  &__random-button {
    margin-top: 2em;
    justify-self: center;
  }
  &__header {
    margin-bottom: 1em;
  }
  &__name {
    color: var(--color-main);
    text-align: left;
    margin: 0;
    margin-top: 1em;
  }

  &__description {
    margin-bottom: 1em;
    justify-self: end;
    align-self: center;
  }

  &__section {
    margin-bottom: 3em;

    &--data {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 1em;
      justify-items: center;
    }

    &--suggestions {
      background: var(--color-main);
      padding: 1em 0;

      &__title {
        color: black;
        text-align: center;
        border: none;
      }

      &__card {
        padding: 0.5em 1em;
        background: black;
      }
    }
  }
}

.ingredient-category {
  &__title {
    text-align: center;
    opacity: 0.5;
    margin-bottom: 0.25em;
  }
}

.ingredient-card {
  border: solid 1px rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em 0;
}

.food-pairing-list {
  .food-pairing-list__item {
    text-align: center;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;

    &::after,
    &::before {
      content: "";
      display: inline-block;
      min-width: 0.5em;
      min-height: 0.5em;
      background: var(--color-main);
      border-radius: 100%;
    }

    &::after {
      margin-left: 0.5em;
    }
  }

  &::before {
    margin-right: 0.5em;
  }
}

// .beer-page__section {
//   display: flex;
//   flex-wrap: wrap;
// }
// .inner-grid {
//   display: grid;
//   grid-template-columns: minmax(320px, 2fr) 1fr;
// }

// .beer-description {
//   max-width: 40em;
//   margin: 2em 0;
// }

// .section--method {
//   background: var(--color-main);
//   padding: 2em 0;
//   // display: flex;

//   .section-heading {
//     color: black;
//     border-color: white;
//     margin-bottom: 1em;
//   }
// }

// .flexbox-grid {
//   display: flex;
//   flex-wrap: wrap;
// }

// .auto-columns {
//   display: grid;
//   grid-auto-flow: column;
//   justify-items: center;
// }
</style>
