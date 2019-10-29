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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
