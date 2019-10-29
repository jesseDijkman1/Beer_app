<template>
  <nav>
    <router-link to="/">Home!</router-link>
    <router-link to="/beers">Beers</router-link>
    <random-beer-link>Random</random-beer-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RandomBeerLink from "./RandomBeerLink.vue";

@Component({
  components: {
    RandomBeerLink,
  },
})
export default class MainNav extends Vue {}
</script>