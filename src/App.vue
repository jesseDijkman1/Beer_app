<template>
  <div id="app">
    <main-nav></main-nav>

    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>

    <site-map></site-map>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SiteMap from "@/components/SiteMap.vue";
import MainNav from "@/components/MainNav.vue";
import { RouteObject } from "@/types";

@Component({
  components: { SiteMap, MainNav },
})
export default class App extends Vue {}
</script>

<style lang="scss">
:root {
  --color-main: #ffb800;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Avenir next", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: black;
  color: white;
}

#app {
  padding-top: 60px;
}

a {
  text-decoration: none;
  color: inherit;
}

li {
  list-style-type: none;
}

strong {
  font-size: 22px;
}

.main-grid {
  $sideWidth: calc(10vw - 5vmin);
  width: 100%;
  display: grid;
  grid-template-columns: minmax($sideWidth, auto) minmax(auto, 960px) minmax(
      $sideWidth,
      auto
    );
}

.main-grid > * {
  grid-column: 2 / 3;
  min-width: 0;
}

.full-width {
  grid-column: 1 / 4;
}

.grid-width {
  grid-column: 2 / 3;
}
</style>
