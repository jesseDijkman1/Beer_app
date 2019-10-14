<template>
  <div id="app"></div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      users: undefined
    };
  },
  beforeMount() {
    this.getUsers(10);
  },
  methods: {
    async getUsers(amount = 1) {
      const response = await fetch(
        `https://randomuser.me/api/?results=${amount}`
      );
      const { info, results } = await response.json();
      console.log(results);

      this.users = results;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
