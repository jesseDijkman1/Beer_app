<template>
  <footer></footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FooterPagination extends Vue {
  @Prop() perPage!: number;
  @Prop() totalEntries!: number;
  @Prop({ default: null }) max!: number | null;

  totalPages: number = Math.ceil(this.totalEntries / this.perPage);

  created() {
    console.log("ok", this.totalPages);
  }
}
</script>