<template>
  <app-navigation-link
    @click.native="setRandomId"
    :url="{name: 'detail', params:{id, hasRandomId: true}}"
  >
    <slot></slot>
  </app-navigation-link>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AppNavigationLink from "@/components/layout/AppNavigation/AppNavigationLink.vue";

@Component({
  components: { AppNavigationLink },
})
export default class extends Vue {
  id: number = Math.floor(Math.random() * 325) + 1;

  setRandomId() {
    this.id = Math.floor(Math.random() * 325) + 1;
  }
}
</script>