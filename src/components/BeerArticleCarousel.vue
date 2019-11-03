<template>
  <div class="article-carousel">
    <header class="article-carousel__dots">
      <span
        class="article-carousel__dot"
        :class="{'is-visible': visibleCard && visibleCard == n}"
        :key="'dot-' + n"
        v-for="n in items"
      ></span>
    </header>
    <div class="article-carousel__container">
      <div class="article-carousel__articles">
        <div
          :class="{'is-visible': visibleCard && visibleCard == n}"
          class="article-carousel__article"
          :data-index="n"
          :key="n"
          v-for="n in items"
        >
          <slot :name="'item-'+ n"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() items!: number;

  visibleCard: number = 0;

  mounted() {
    const container = this.$el.querySelector(".article-carousel__container");
    const elements = this.$el.querySelectorAll(".article-carousel__article");

    const options = {
      root: container,
      threshold: 0.75,
      rootMargin: "0px",
    };

    const observer = new IntersectionObserver(this.setVisibleCard, options);

    for (let element of elements) {
      observer.observe(element);
    }
  }

  setVisibleCard(entries, observer) {
    if (this.visibleCard !== 0) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        this.visibleCard = entry.target.dataset.index;
      });
    } else {
      this.visibleCard = 1;
    }
  }
}
</script>

<style lang="scss" scoped>
.article-carousel {
  &__dots {
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
  }

  &__dot {
    width: 10px;
    height: 10px;
    background: black;
    opacity: 0.5;
    transition: all 0.2s ease;
    border-radius: 100%;

    &:not(:last-of-type),
    &:not(:first-of-type) {
      margin: 0 1em;
    }

    &.is-visible {
      background: white;
      opacity: 1;
    }
  }

  &__container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 0.5rem;
  }

  &__articles {
    grid-column: 2 / 3;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    grid-gap: 2em;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__article {
    transform: scale(0.9);
    transition: transform 0.2s linear;

    &.is-visible {
      transform: scale(1);
    }
  }
}

@media screen and (min-width: 500px) {
  .article-carousel__dots {
    display: none;
  }

  .article-carousel__article {
    transform: scale(1);
  }
}
</style>