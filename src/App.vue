<template>
  <div id="app">
    <nav>
      <router-link to="/about">Wow</router-link>
    </nav>
    <router-view></router-view>
    <site-map :routes="routesList"></site-map>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SiteMap from "@/components/SiteMap.vue";

interface routeObject {
  name: string;
  path: string;
}

@Component({
  components: { SiteMap },
})
export default class App extends Vue {
  routesList!: any[];

  created() {
    this.routesList = this.$router.options.routes.map(
      (route: any): routeObject => ({ name: route.name, path: route.path })
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
