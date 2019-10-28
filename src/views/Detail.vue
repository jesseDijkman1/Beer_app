<template>
  <div>
    <h1>This is a detail page {{id}}</h1>
    {{beer.name}}
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";

@Component
export default class Detail extends Vue {
  @Prop() id!: number;
  @Prop() data!: object | null;

  beer: object = {};

  @Watch("id", { immediate: true })
  async fn() {
    if (this.data == null) {
      try {
        const response = await fetch(this.apiUrl);

        this.beer = (await response.json())[0];
      } catch (error) {
        throw new Error("API call failed!");
      }
    }
  }

  get apiUrl() {
    return `https://api.punkapi.com/v2/beers/${this.id}`;
  }
}
</script>