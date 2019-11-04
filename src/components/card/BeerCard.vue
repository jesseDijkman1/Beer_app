<template>
  <app-card class="beer-card">
    <ebc-color-display
      v-show="colorDisplay && colorDisplay !== undefined"
      :ebc="ebc"
      class="beer-card__color"
    ></ebc-color-display>

    <div class="beer-card__container">
      <header class="beer-card_header">
        <h1 class="beer-card__title font-large">{{name}}</h1>
        <p class="beer-card__tagline font-regular">{{tagline}}</p>
      </header>

      <footer class="beer-card__footer">
        <data-item name="ABV" :value="abv" />
        <data-item name="IBU" :value="ibu" />
        <data-item name="EBC" :value="ebc" />
      </footer>
    </div>
  </app-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import EbcColorDisplay from "@/components/ui/EbcColorDisplay.vue";
import DataItem from "@/components/ui/DataItem.vue";

import AppCard from "./index.vue";

@Component({
  components: {
    EbcColorDisplay,
    DataItem,
    AppCard,
  },
})
export default class BeerArticleCard extends Vue {
  @Prop() id!: number;
  @Prop({ default: "?" }) name!: string;
  @Prop() tagline!: string;
  @Prop() abv!: number;
  @Prop() ebc!: number;
  @Prop() ibu!: number;
  @Prop({ default: true }) colorDisplay!: boolean;
}
</script>

<style lang="scss" scoped>
.beer-card {
  display: flex;
  width: 100%;
  min-width: 304px;

  &__container {
    width: 100%;
  }

  &__color {
    width: calc(10% - 5vmin);
    min-width: 1em;
    max-width: 3em;
    margin-right: calc(10% - 5vmin);
    background-image: url("https://media.mnn.com/assets/images/2016/02/sparking-water.jpg.653x0_q80_crop-smart.jpg");
    background-blend-mode: multiply;
    background-size: cover;
    transition: all 0.3s ease;
  }

  &__title {
    color: var(--color-main);
    font-family: Calibri, Arial, sans-serif;
    transition: all 0.3s ease;
  }

  &__tagline {
    color: white;
  }

  &__footer {
    margin-top: 1em;
    max-width: 25em;
    display: flex;
    justify-content: space-between;
    width: 90%;
  }

  &:hover {
    cursor: pointer;
  }

  &:hover &__color {
    background-color: white !important;
  }

  &:hover &__title {
    color: white;
  }
}
// .beer-article {
//   display: flex;
//   min-height: 10em;
//   height: auto;
//   width: 100%;
//   overflow: hidden;
//   transition: all 0.2s linear;

//   &__color {
//     width: 7%;
//     max-width: 5em;
//     min-width: 2em;
//     align-self: stretch;
//     transition: inherit;
//     margin-right: 5%;
//
//   }

//   &__header {
//     margin-bottom: 2em;
//   }
//   &__footer {
//     display: flex;
//     overflow-x: scroll;

//     // .data-item:not(:first-of-type) {
//     //   margin-left: 10%;
//     // }
//   }

//   // Hovers
//   &:hover {
//     cursor: pointer;
//   }

//   &:hover &__color {
//     background-color: white !important;
//   }

//   &:hover &__title {
//     color: white;
//   }
// }

// .flex-wrapper--column {
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   width: 100%;
// }

// .percentage-symbol {
//   font-size: 0.4em;
//   align-self: flex-end;
//   margin-bottom: 0.5em;
// }
</style>