<template>
  <footer>
    <ol>
      <li :key="n" v-for="n in pages">
        <router-link :class="{'is-active': n == currentPage}" :to="url + n">{{n}}</router-link>
      </li>
    </ol>
  </footer>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class FooterPagination extends Vue {
  @Prop() url!: string;
  @Prop() currentPage!: string;
  @Prop() perPage!: number;
  @Prop() totalEntries!: number;
  @Prop({ default: Infinity }) maxLength!: number;

  totalPages: number = Math.ceil(this.totalEntries / this.perPage);

  get pages(): number[] | number {
    if (this.maxLength == Infinity) {
      return this.totalPages;
    }

    const array: number[] = [];

    const loopStart = -Math.floor(this.maxLength / 2);
    const loopEnd = Math.ceil(this.maxLength / 2);

    for (let i = loopStart; i < loopEnd; i++) {
      let n: number = i + parseInt(this.currentPage);

      if (n <= 0) {
        n += this.maxLength;
      }

      if (n > this.totalPages) {
        n -= this.maxLength;
      }

      array.push(n);
    }

    return array.sort((a, b) => a - b);
  }
}
</script>
