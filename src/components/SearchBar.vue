<template>
  <input v-model="value" class="search-bar" type="text" :placeholder="placeholder" />
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component
export default class SearchBar extends Vue {
  @Prop({ default: "Search ..." }) placeholder!: string;
  @Prop({ default: false }) autoSearch!: boolean;
  @Prop() delay!: number;

  value: string = "";
  timeout: any;

  created() {
    console.log(this.autoSearch, this.delay);
  }

  @Watch("value")
  fn() {
    // Debounce
    clearTimeout(this.timeout);

    if (!this.value) {
      // If the input is empty emit immediately
      this.$emit("search", this.value);
    } else {
      this.timeout = setTimeout(() => {
        this.$emit("search", this.value);
      }, this.delay);
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  border-bottom: solid 2px var(--color-main);
}
</style>