<template>
  <div id="app">
    <main-nav></main-nav>

    <keep-alive include="Home">
      <router-view class="main-grid"></router-view>
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
  max-width: 960px;
  margin: 0 auto;
}
</style>
