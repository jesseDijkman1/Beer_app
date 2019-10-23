<template>
  <div id="app">
    <main-nav></main-nav>

    <keep-alive include="Home">
      <router-view></router-view>
    </keep-alive>

    <site-map :routes="routesList"></site-map>
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
export default class App extends Vue {
  private routesList!: RouteObject[];

  private beforeCreate() {
    // @ts-ignore: Property 'options' does not exist on type 'VueRouter'.
    this.routesList = this.$router.options.routes.map(
      (route: any): RouteObject => ({ name: route.name, path: route.path })
    );
  }
}
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
