<template>
  <nav class="main-nav">
    <ul class="main-nav__list">
      <li class="main-nav__item">
        <router-link to="/">Home</router-link>
      </li>
      <li class="main-nav__item">
        <router-link to="/beers">Beers</router-link>
      </li>
      <li class="main-nav__item">
        <random-beer-link>Random</random-beer-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
import RandomBeerLink from "./RandomBeerLink.vue";

@Component({
  components: {
    RandomBeerLink,
  },
})
export default class MainNav extends Vue {
  currentRoute!: string;

  @Watch("$route")
  fn() {}
}
</script>

<style lang="scss" scoped>
.is-active {
  background: blue;
}
.main-nav {
  z-index: 10;
  position: fixed;
  top: 0;
  font-family: Calibri, Arial, sans-serif;
  color: var(--color-main);
  height: 3em;
  font-size: 20px;
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.8) 70%,
    rgba(0, 0, 0, 0) 100%
  );

  &__list {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    width: 50%;
    min-width: 340px;
  }
  &__item {
    list-style-type: none;

    a {
      text-decoration: none;
      color: var(--color-main);
    }
  }
}
</style>

