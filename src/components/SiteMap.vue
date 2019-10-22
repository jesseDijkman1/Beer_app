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

interface routeObject {
  name: string;
  path: string;
}

@Component
export default class SiteMap extends Vue {
  @Prop() routes!: Array<routeObject>;

  created() {
    console.log("site map created");
  }
}
</script>