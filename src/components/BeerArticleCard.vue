<template>
  <article class="beer-article">
    <span class="beer-article__color"></span>

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

  &__color {
    width: 1em;
    align-self: stretch;
    background: white;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    transition: all 0.2s linear;
    margin-right: 5%;
  }

  &__header {
    margin-bottom: 2em;
  }

  &__title {
    color: var(--color-main);
    font-family: Calibri, Arial, sans-serif;
    font-size: 3rem;
    transition: all 0.2s linear;
  }

  &__tagline {
    font-size: 1.25rem;
  }
  &__footer {
    display: flex;

    dl {
      display: flex;
      align-items: flex-end;

      &:not(:first-of-type) {
        margin-left: 3em;
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
    clip-path: polygon(0% 0%, 100% 0%, 0% 100%, 100% 100%);
    background: white;
  }

  &:hover &__title {
    color: white;
  }
}

.flex-wrapper--column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.percentage-symbol {
  font-size: 0.4em;
  align-self: flex-end;
  margin-bottom: 0.5em;
}
</style>