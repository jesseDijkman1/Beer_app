<template>
  <dl class="data-item">
    <dt class="data-item__title"></dt>
    <dd class="data-item__value">
      <span class="data-item__unit"></span>
    </dd>
  </dl>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop() name!: string;
  @Prop() value!: number | number;
  @Prop() unit!: string;
}
</script>