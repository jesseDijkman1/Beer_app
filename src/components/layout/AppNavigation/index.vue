<template>
  <div class="navigation grid-base" :class="{'is-open': isOpen}">
    <app-navigation-hamburger
      class="navigation__hamburger"
      :class="{'is-open': isOpen}"
      @click.native="isOpen = !isOpen"
    />

    <nav class="navigation__list">
      <app-navigation-link name="home" url="/">Home</app-navigation-link>
      <app-navigation-link name="beers" url="/beers">Beers</app-navigation-link>
      <app-navigation-link
        @click.native="setRandomId"
        :url="{name: 'detail', params:{id: randomId, hasRandomId: true}}"
      >Random</app-navigation-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";

import AppNavigationLink from "./AppNavigationLink.vue";
import AppNavigationHamburger from "./AppNavigationHamburger.vue";

@Component({
  components: {
    AppNavigationLink,
    AppNavigationHamburger,
  },
})
export default class extends Vue {
  currentRoute: string = "";
  isOpen: boolean = false;

  randomId: number = Math.floor(Math.random() * 325) + 1;

  created() {
    this.currentRoute = this.$router.currentRoute.name || "";
  }

  setRandomId() {
    this.randomId = Math.floor(Math.random() * 325) + 1;
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  padding: 1em 0;

  .is-open & {
    &__list {
      margin-top: 1em;
      max-height: 100vh;
    }
  }

  &__list {
    align-items: center;
    display: grid;
    grid-auto-flow: row;
    justify-items: start;
    max-height: 0;
    overflow: hidden;
    width: 100%;
    transition: all 0.3s ease;
  }
}

@media (min-width: 400px) {
  .navigation__list {
    max-height: none;
    grid-auto-flow: column;
  }

  .navigation__hamburger {
    display: none;
  }
}
</style>

