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

    this.timeout = setTimeout(() => {
      if (this.value) {
        this.$emit("search", this.value);
      }
    }, this.delay);
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  border-bottom: solid 2px var(--color-main);
}
</style>