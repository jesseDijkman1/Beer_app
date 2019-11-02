<template>
  <div class="beer-method-card">
    <section-heading class="beer-method-card__title">Test</section-heading>
    <div class="beer-method-card__data">
      <data-item class="beer-method-card__item" name="Temperatur" value="10" unit="celsius" />
      <data-item class="beer-method-card__item" name="Duration" value="10" unit="celsius" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import SectionHeading from "@/components/headings/SectionHeading.vue";
import DataItem from "@/components/DataItem.vue";

@Component({
  components: {
    SectionHeading,
    DataItem,
  },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
// .beer-method-card {
//   border: solid 1px red;
//   padding: 1em;
//   display: inline-flex;
//   flex-direction: column;
//   background: black;
//   box-sizing: padding-box;

//   &__title {
//     text-align: left;
//     font-size: 1.5rem;
//   }

//   &__data {
//     display: flex;
//   }

//   &__item {
//     &:not(:last-of-type) {
//       margin-right: 5vw;
//     }
//   }
// }
</style>