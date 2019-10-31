<template>
  <div class="sorting-handler" :class="{'is-active': isActive}">
    <div class="sorting-handler__options">
      <button
        :key="i"
        v-for="(option, i) in options"
        class="sorting-handler__option"
        :class="{'is-current': current == option}"
        :style="{transitionDelay: `${i / 20}s`}"
        @click="sort(option)"
      >
        {{option}}
        <span class="double-arrow"></span>
      </button>
    </div>
    <button @click="isActive = !isActive" class="sorting-handler__button">
      <slot></slot>
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
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
  font-family: Calibri, Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  font-size: 1.5rem;
  margin-bottom: 1em;

  &__options {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 0.5em;
    font-family: inherit;
    flex-grow: 1;
    overflow-x: scroll;
  }

  &__option {
    background: var(--color-main);
    border: none;
    font-family: inherit;
    font-size: 1.25rem;
    color: black;
    font-weight: bold;
    padding: 0.25em 0.5em;
    outline: none;
    white-space: nowrap;
    justify-self: center;
    border-radius: 0.25em;
    display: flex;
    align-items: stretch;
    transform: translateY(-100%);
    opacity: 0;
    transition: transform 0.2s ease-in-out, opacity 0.2s linear;

    &.is-current {
      background: white;
    }
  }

  .is-active &__option {
    opacity: 1;
    transform: translateY(0);
  }

  &__button {
    padding: 0.25em 0.5em;
    border: solid 2px var(--color-main);
    color: var(--color-main);
    font: inherit;
    border-radius: 0.25em;
    outline: none;
    background: none;
    transition: all 0.2s linear;
  }

  .is-active &__button {
    color: white;
    border-color: white;
  }
}

.double-arrow {
  width: 0.5em;
  position: relative;
  margin-left: 0.5em;
  transform: scaleY(0.75);

  &::after,
  &::before {
    content: "";
    display: block;
    position: absolute;
    background: black;
    width: 100%;
    height: 40%;
  }

  &::after {
    top: 0;
    clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
  }

  &::before {
    bottom: 0;
    clip-path: polygon(0% 0, 50% 100%, 100% 0%);
  }
}
</style>

