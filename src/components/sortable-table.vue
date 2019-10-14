<template>
  <table class="sortable-table">
    <tr>
      <th v-on:click="$emit('sort-table', {key: 'firstName', type: 'string'})">First Name</th>
      <th v-on:click="$emit('sort-table', {key: 'lastName', type: 'string'})">Last Name</th>
      <th v-on:click="$emit('sort-table', {key: 'age', type: 'number'})">Age</th>
      <th v-on:click="$emit('sort-table', {key: 'country', type: 'string'})">Country</th>
    </tr>

    <tr v-bind:key="index" v-for="(user, index) in people">
      <td>{{user.firstName}}</td>
      <td>{{user.lastName}}</td>
      <td>{{user.age}}</td>
      <td>{{user.country}}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "sortable-table",
  props: ["users"],
  computed: {
    people() {
      return this.users;
    }
  }
};
</script>

<style scoped>
.sortable-table tr th {
  background: #eee;
}
.sortable-table tr {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: left;
  grid-gap: 1em;
}
</style>
