<template>
  <footer>
    <ul>
      <li v-bind:key="route.name" v-for="route in routes">
        <router-link :to="route.path">{{route.name}}</router-link>
      </li>
    </ul>
  </footer>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RouteObject } from "@/types";

@Component
export default class SiteMap extends Vue {
  routes!: RouteObject[];

  beforeCreate() {
    // @ts-ignore: Property 'options' does not exist on type 'VueRouter'.
    this.routes = this.$router.options.routes.map(
      (route: any): RouteObject => {
        return { name: route.name, path: route.path };
      }
    );
  }
}
</script>