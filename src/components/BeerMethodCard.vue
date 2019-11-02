<template>
  <div class="beer-method-card">
    <h3 class="beer-method-card__title font-medium">{{name}}</h3>
    <p class="beer-method-card__description font-regular" v-if="typeof data == 'string'">{{data}}</p>
    <description-list v-else class="beer-method-card__description" :data="data" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import DescriptionList from "@/components/DescriptionList.vue";
import DataItem from "@/components/DataItem.vue";

@Component({
  components: {
    DescriptionList,
    DataItem,
  },
})
export default class extends Vue {
  @Prop() name!: string;
  @Prop() data!: object[] | object | string;

  created() {
    console.log(this.data);
  }
}
</script>

<style lang="scss" scoped>
.beer-method-card {
  border: solid 1px rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5em 0;

  &__title {
    font-family: Calibri, Arial, sans-serif;
    margin-bottom: 0.5em;
  }

  &__description {
    margin: 0 1em;
  }
}
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