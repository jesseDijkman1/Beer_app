<template>
  <div class="main-grid">
    <random-beer-button v-if="hasRandomId">Random Beer!</random-beer-button>

    <beer-article-header :title="beer.name" :tagline="beer.tagline" />

    <div class="inner-grid">
      <p class="beer-description">{{beer.description}}</p>

      <div class="flexbox-grid">
        <data-item name="ABV" :value="beer.abv" />
        <data-item name="IBU" :value="beer.ibu" />
        <data-item name="EBC" :value="beer.ebc" />
        <data-item name="FG" :value="beer.target_fg" />
        <data-item name="OG" :value="beer.target_og" />
        <data-item name="SRM" :value="beer.srm" />
        <data-item name="PH" :value="beer.ph" />
      </div>
    </div>

    <section class="section--method full-width main-grid">
      <section-heading>Method</section-heading>
      <div clas="auto-columns">
        <beer-method-card />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import RandomBeerButton from "@/components/RandomBeerButton.vue";
import DataGroupList from "@/components/DataGroupList.vue";
import MainHeading from "@/components/MainHeading.vue";
import SectionHeading from "@/components/SectionHeading.vue";
import BeerArticleHeader from "@/components/BeerArticleHeader.vue";
import BeerMethodCard from "@/components/BeerMethodCard.vue";
import DataItem from "@/components/DataItem.vue";

@Component({
  components: {
    RandomBeerButton,
    DataGroupList,
    MainHeading,
    BeerArticleHeader,
    DataItem,
    SectionHeading,
    BeerMethodCard,
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

    console.log(this.beer);
  }

  get apiUrl() {
    return `https://api.punkapi.com/v2/beers/${this.id}`;
  }
}
</script>

<style lang="scss" scoped>
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
