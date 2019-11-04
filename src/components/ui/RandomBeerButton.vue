<template>
  <app-button
    @click="$router.push({name: 'detail', params: { id: randomId(), hasRandomId: true }})"
  >
    <slot></slot>
  </app-button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import AppButton from "@/components/ui/AppButton.vue";

@Component({
  components: {
    AppButton,
  },
})
export default class extends Vue {
  private randomId(): number {
    return Math.floor(Math.random() * 325) + 1;
  }
}
</script>