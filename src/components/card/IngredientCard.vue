<template>
  <app-card class="ingredient-card">
    <slot>
      <description-list :data="ingredient" />
    </slot>
  </app-card>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import DescriptionList from "@/components/ui/DescriptionList.vue";
import AppCard from "./index.vue";

@Component({
  components: {
    AppCard,
    DescriptionList,
  },
})
export default class extends Vue {
  @Prop({ type: Array }) private readonly ingredient!: object[];
}
</script>