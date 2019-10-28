<template>
  <nav>
    <router-link to="/">Home!</router-link>
    <router-link to="/about">About</router-link>
    <router-link
      @click.native="randomBeer = newRandomBeer()"
      :to="{name: 'detail', params: {id: randomBeer, data: null}}"
    >Random</router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MainNav extends Vue {
  randomBeer: number = this.newRandomBeer();

  newRandomBeer() {
    return Math.floor(Math.random() * 325) + 1;
  }
}
</script>