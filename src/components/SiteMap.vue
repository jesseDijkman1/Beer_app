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
import { Component, Prop, Vue } from "vue-property-decorator";
import { RouteObject } from "@/types";

@Component
export default class SiteMap extends Vue {
  @Prop() private routes!: RouteObject[];
}
</script>