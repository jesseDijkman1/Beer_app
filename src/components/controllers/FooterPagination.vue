<template>
  <footer class="footer-pagination">
    <button
      :class="{'is-hidden': Number(currentPage) == 1}"
      @click="previousPage"
      class="footer-pagination__button footer-pagination__button--back"
    ></button>
    <ol class="footer-pagination__list">
      <li
        class="footer-pagination__page"
        :key="n"
        v-for="n in pages"
        :class="{'is-active': n == currentPage}"
      >
        <router-link :to="url + n">{{n}}</router-link>
      </li>
    </ol>
    <button
      :class="{'is-hidden': Number(currentPage) == totalPages}"
      @click="nextPage"
      class="footer-pagination__button footer-pagination__button--next"
    ></button>
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

  previousPage() {
    const current = Number(this.currentPage);

    if (current > 1) {
      this.$router.push(this.url + (current - 1));
    }
  }

  nextPage() {
    const current = Number(this.currentPage);

    if (current < this.totalPages) {
      this.$router.push(this.url + (current + 1));
    }
  }
}
</script>


<style lang="scss" scoped>
.footer-pagination {
  border-top: solid 2px var(--color-main);
  padding-top: 0.5em;
  display: flex;
  // justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  &__button {
    background: none;
    border: none;
    font-size: inherit;
    height: 1em;
    width: 1em;
    background: white;
    opacity: 0.5;
    transition: opacity 0.2s ease;

    &--next {
      clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
      margin-left: auto;
    }

    &--back {
      clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
      margin-right: auto;
    }

    &:hover {
      cursor: pointer;
      opacity: 1;
    }
  }

  &__list {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 1em;
  }

  &__page {
    position: relative;

    &.is-active {
      color: var(--color-main);
      text-decoration: underline;
      font-weight: bold;
    }
  }
}

.is-hidden {
  pointer-events: none;
  opacity: 0;
}
</style>