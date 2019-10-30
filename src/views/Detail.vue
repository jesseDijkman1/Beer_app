<template>
  <div>
    <h1>{{beer.name}}</h1>
    <random-beer-button v-if="hasRandomId">Random Beer!</random-beer-button>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";
import RandomBeerButton from "@/components/RandomBeerButton.vue";

@Component({
  components: {
    RandomBeerButton,
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

  get apiUrl() {
    return `https://api.punkapi.com/v2/beers/${this.id}`;
  }
}
</script>