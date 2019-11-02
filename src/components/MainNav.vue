<template>
  <nav class="main-nav grid-base" :class="{'is-open': isOpen}">
    <div class="main-nav__container">
      <button @click="isOpen = !isOpen" class="main-nav__hamburger">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul class="main-nav__list">
        <li class="main-nav__item font-medium" :class="{'is-active': currentRoute == 'home'}">
          <router-link to="/">Home</router-link>
        </li>
        <li class="main-nav__item font-medium" :class="{'is-active': currentRoute == 'beers'}">
          <router-link to="/beers">Beers</router-link>
        </li>
        <li class="main-nav__item font-medium">
          <random-beer-link>Random</random-beer-link>
        </li>
      </ul>
    </div>
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
  currentRoute: string = "";
  isOpen: boolean = false;

  created() {
    this.currentRoute = this.$router.currentRoute.name || "";
  }

  @Watch("$route")
  fn() {
    this.currentRoute = this.$router.currentRoute.name || "";

    setTimeout(() => {
      this.isOpen = false;
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
.main-nav {
  padding: 1em 0;

  .is-open & {
    &__list {
      margin-top: 1em;
      max-height: 100vh;
    }

    &__hamburger {
      span {
        background: white;
      }
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__hamburger {
    height: 1.5em;
    width: 1.5em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;

    &:hover {
      cursor: pointer;
    }

    span {
      transition: all 0.3s ease;
      height: 2px;
      background: var(--color-main);
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

  &__item {
    color: var(--color-main);
    font-family: Calibri, Arial, sans-serif;
    font-weight: bold;
    transition: color 1s ease;
    position: relative;

    &:hover {
      cursor: pointer;
      color: white;
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 0;
      height: 3px;
      background: white;
      bottom: 0;
      left: 0;
      transition: all 0.3s ease;
    }

    &.is-active {
      color: white;

      &::after {
        width: 100%;
        z-index: 10;
      }
    }
  }
}

@media (min-width: 400px) {
  .main-nav__hamburger {
    display: none;
  }
  .main-nav__list {
    max-height: none;
    grid-auto-flow: column;
  }
}
</style>

