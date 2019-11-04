<template>
  <div class="sorting-handler font-medium" :class="{'is-active': isActive}">
    <app-button class="sorting-handler__button" @click="isActive = !isActive">
      <slot></slot>
    </app-button>
    <div class="sorting-handler__options">
      <button
        :key="i"
        v-for="(option, i) in options"
        class="sorting-handler__option font-regular"
        :class="{'is-current': current == option}"
        :style="{transitionDelay: `${i / 20}s`}"
        @click="sort(option)"
      >
        {{option}}
        <span></span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import AppButton from "@/components/ui/AppButton.vue";

@Component({
  components: {
    AppButton,
  },
})
export default class SortingHandler extends Vue {
  @Prop() options!: string[];

  current: string = "";
  isActive: boolean = false;

  sort(val: string) {
    this.current = val;

    this.$emit("sortBy", val);
  }
}
</script>

<style lang="scss" scoped>
.sorting-handler {
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;

  &__options {
    display: flex;
    justify-content: space-around;
    transition: all 0.3s ease 0.3s;
    overflow-y: hidden;
    max-height: 0;
    margin-top: 0;
  }

  .is-active &__options {
    max-height: 10vh;
    margin-top: 0.5em;
    transition: max-height 0.3s ease;
  }

  &__option {
    display: inline-flex;
    align-items: stretch;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.25em 0.5em;
    color: white;
    border-radius: 0.2em;
    transform: translateX(-100vw);
    transition: background 0.3s ease, transform 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.5);

      span::before,
      span::after {
        background: white;
      }
    }

    span {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 0.35em;
      justify-content: space-between;
      margin-left: 0.5em;

      &::after,
      &::before {
        content: "";
        display: block;
        width: 100%;
        height: 40%;
        background: var(--color-main);
        transition: all 0.3s ease;
      }

      &::before {
        clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
      }
      &::after {
        clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
      }
    }
  }

  .is-active &__option {
    transform: translateX(0);
  }
}

@media (min-width: 500px) {
  .sorting-handler {
    display: flex;
    flex-direction: row-reverse;

    &__options {
      align-items: center;
      width: 100%;
      margin-right: 0.5em;
      margin-top: 0 !important;
    }
  }
}
</style>

