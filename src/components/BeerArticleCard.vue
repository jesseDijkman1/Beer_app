<template>
  <article class="beer-article">
    <ebc-color-display :ebc="ebc" class="beer-article__color"></ebc-color-display>
    <div class="flex-wrapper--column">
      <header class="beer-article__header">
        <h1 class="beer-article__title">{{name}}</h1>
        <p class="beer-article__tagline">{{tagline}}</p>
      </header>

      <footer class="beer-article__footer">
        <dl>
          <dt>ALC</dt>
          <dd>
            {{alcohol}}
            <span class="percentage-symbol">%</span>
          </dd>
        </dl>
        <dl>
          <dt>IBU</dt>
          <dd>{{ibu}}</dd>
        </dl>
        <dl>
          <dt>EBC</dt>
          <dd>{{ebc}}</dd>
        </dl>
      </footer>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import EbcColorDisplay from "@/components/EbcColorDisplay.vue";

@Component({
  components: {
    EbcColorDisplay,
  },
})
export default class BeerArticleCard extends Vue {
  @Prop() id!: number;
  @Prop({ default: "" }) name!: string;
  @Prop({ default: "" }) tagline!: string;
  @Prop() alcohol!: number;
  @Prop() ebc!: number;
  @Prop() ibu!: number;
}
</script>

<style lang="scss" scoped>
.beer-article {
  display: flex;
  min-height: 10em;
  height: auto;
  width: 100%;
  overflow: hidden;
  transition: all 0.2s linear;

  &__color {
    width: 10%;
    max-width: 5em;
    min-width: 3em;
    align-self: stretch;
    transition: inherit;
    margin-right: 5%;
    background-image: url("https://media.mnn.com/assets/images/2016/02/sparking-water.jpg.653x0_q80_crop-smart.jpg");
    background-blend-mode: multiply;
    background-size: cover;
  }

  &__header {
    margin-bottom: 2em;
  }

  &__title {
    color: var(--color-main);
    font-family: Calibri, Arial, sans-serif;
    font-size: 3rem;
    transition: all 0.2s linear;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 80vw;
    overflow: hidden;
  }

  &__tagline {
    font-size: 1.25rem;
    display: flex;
    max-width: 80vw;
  }
  &__footer {
    display: flex;
    overflow-x: scroll;

    dl {
      display: flex;
      align-items: flex-end;

      &:not(:first-of-type) {
        margin-left: 10%;
      }

      dt {
        color: var(--color-main);
        font-family: Calibri, Arial, sans-serif;
        font-weight: bold;
        margin-right: 0.25em;
      }

      dd {
        font-weight: bold;
        font-size: 2.625em;
        display: flex;
      }
    }
  }

  // Hovers
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

.flex-wrapper--column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}

.percentage-symbol {
  font-size: 0.4em;
  align-self: flex-end;
  margin-bottom: 0.5em;
}
</style>