<template>
  <!-- <div class="beer-method-card"> -->
  <app-card class="method-card">
    <h3 class="beer-method-card__title font-medium">
      <slot></slot>
    </h3>
    <p class="beer-method-card__description font-regular" v-if="typeof data == 'string'">{{data}}</p>
    <description-list v-else class="beer-method-card__description" :data="data" />
  </app-card>
  <!-- </div> -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import DescriptionList from "@/components/ui/DescriptionList.vue";
import DataItem from "@/components/ui/DataItem.vue";

import AppCard from "./index.vue";

@Component({
  components: {
    DescriptionList,
    DataItem,
    AppCard,
  },
})
export default class extends Vue {
  @Prop() data!: object[] | object | string;
}
</script>

<style lang="scss" scoped>
.method-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    font-family: Calibri, Arial, sans-serif;
    margin-bottom: 0.5em;
  }

  &__description {
    margin: 0 1em;
  }
}
</style>