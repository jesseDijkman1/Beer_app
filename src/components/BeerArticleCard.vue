<template>
  <article class="beer-article">
    <span class="beer-article__color"></span>
    <div class="image-container">
      <img :src="img" alt />
    </div>
    <h1 class="beer-article__title">{{name}}</h1>
    <p class="beer-article__tagline">{{tagline}}</p>
    <strong class="beer-article__alcohol">{{alcohol}}</strong>
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
  @Prop({ default: "" }) name!: string;
  @Prop({ default: "" }) tagline!: string;
  @Prop() alcohol!: number;
  @Prop() img!: string;
  @Prop() ebc!: number;
}
</script>
