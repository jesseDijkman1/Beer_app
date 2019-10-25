<template>
  <td>
    <slot></slot>
  </td>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class VueTable extends Vue {
  @Prop() column!: string;
}
</script>