<template>
  <section class="sitemap">
    <ul>
      <li class="font-regular" v-bind:key="route.name" v-for="route in routes">
        <router-link :to="route.path">{{route.name}}</router-link>
      </li>
    </ul>
  </section>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RouteObject } from "@/types";

import AppNavigationLink from "@/components/layout/AppNavigation/AppNavigationLink.vue";

@Component({
  components: {
    AppNavigationLink,
  },
})
export default class extends Vue {
  routes!: RouteObject[];

  beforeCreate() {
    // @ts-ignore: Property 'options' does not exist on type 'VueRouter'.
    this.routes = this.$router.options.routes.filter((route: any) => {
      // Not sure what the qualifications are for a route to be included in the sitemap
      if ("name" in route && !/\:/.test(route.path)) {
        return { name: route.name, path: route.path };
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.sitemap {
}
</style>