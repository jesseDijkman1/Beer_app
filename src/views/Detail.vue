<template>
  <div class="beer-page grid-base">
    <random-beer-button v-if="hasRandomId">Random Beer!</random-beer-button>

    <header class="beer-page__header">
      <main-heading class="beer-page__name">{{beer.name}}</main-heading>
      <p class="beer-page__tagline font-medium">{{beer.tagline}}</p>
    </header>

    <p class="beer-page__description font-regular">{{beer.description}}</p>

    <section-heading>Data</section-heading>

    <section class="beer-page__section beer-page__section--data">
      <data-item name="ABV" :value="beer.abv" />
      <data-item name="IBU" :value="beer.ibu" />
      <data-item name="EBC" :value="beer.ebc" />
      <data-item name="FG" :value="beer.target_fg" />
      <data-item name="OG" :value="beer.target_og" />
      <data-item name="SRM" :value="beer.srm" />
      <data-item name="PH" :value="beer.ph" />
    </section>

    <section-heading>Method</section-heading>

    <section class="beer-page__section beer-page__section--method">
      <grid-list>
        <beer-method-card name="Mash Temperature" :data="methodData.mash_temp" />
        <beer-method-card name="Fermentation" :data="methodData.fermentation" />
        <beer-method-card name="Twist" :data="methodData.twist" />
      </grid-list>
    </section>

    <section-heading>Ingredients</section-heading><section
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import RandomBeerButton from "@/components/RandomBeerButton.vue";
import DataGroupList from "@/components/DataGroupList.vue";

import GridList from "@/components/GridList.vue";

import MainHeading from "@/components/headings/MainHeading.vue";
import SectionHeading from "@/components/headings/SectionHeading.vue";

import BeerMethodCard from "@/components/BeerMethodCard.vue";
import DataItem from "@/components/DataItem.vue";

@Component({
  components: {
    RandomBeerButton,
    DataGroupList,
    MainHeading,
    DataItem,
    SectionHeading,
    BeerMethodCard,
    GridList,
  },
})
export default class Detail extends Vue {
  @Prop() id!: number | boolean;
  @Prop() data!: object | undefined;
  @Prop({ default: false }) hasRandomId!: boolean;

  beer: object = {};

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

  get apiUrl(): string {
    return `https://api.punkapi.com/v2/beers/${this.id}`;
  }

  get methodData() {
    console.log("fuck", this.beer.method);
    return {
      mash_temp: [
        {
          title: "Temperature",
          value: this.beer.method.mash_temp[0].temp.value,
          unit: this.beer.method.mash_temp[0].temp.unit,
        },
        {
          title: "Duration",
          value: this.beer.method.mash_temp[0].duration,
          unit: "",
        },
      ],
      fermentation: [
        {
          title: "Temperature",
          value: this.beer.method.fermentation.temp.value,
          unit: this.beer.method.fermentation.temp.unit,
        },
      ],
      twist: this.beer.method.twist || "None",
    };
  }
}
</script>

<style lang="scss" scoped>
.beer-page {
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
    margin-bottom: 3em;
  }

  &__section {
    margin-bottom: 3em;

    &--data {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 1em;
      justify-items: center;
    }
  }
}
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
