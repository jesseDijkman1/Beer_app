<template>
  <router-link :class="{'is-active': isActive}" class="navigation__link font-medium" :to="url">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ default: "/", type: [String, Object] }) readonly url!: string;
  @Prop({ default: "", type: String }) readonly name!: string;

  isActive: boolean = false;

  @Watch("$route", { immediate: true })
  checkRoute() {
    this.isActive = this.$router.currentRoute.name == this.name;
  }
}
</script>

<style lang="scss" scoped>
.navigation__link {
  color: var(--color-main);
  font-family: Calibri, Arial, sans-serif;
  transition: color 1s ease;
  position: relative;

  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 3px;
    background: white;
    bottom: 0;
    left: 0;
    transition: all 0.3s ease;
  }

  &.is-active {
    color: white;

    &::after {
      width: 100%;
      z-index: 10;
    }
  }
}
</style>
