<template>
  <div class="container">
    <footer class="app-footer">
      <section class="app-footer__section">
        <h3 class="app-footer__title font-medium">Sitemap</h3>
        <app-footer-sitemap />
      </section>
    </footer>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AppFooterSitemap from "./AppFooterSitemap.vue";

@Component({
  components: {
    AppFooterSitemap,
  },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  border-top: solid 1px var(--color-main-dark);
  padding: 2em 0;
  background: black;
}
.app-footer {
  display: flex;

  &__title {
    border-bottom: solid 2px var(--color-main);
    margin-bottom: 0.5em;
  }
}
</style>