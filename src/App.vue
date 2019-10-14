<template>
  <div id="app">
    <SortableTable v-on:sort-table="sortBy" v-bind:users="users" />
  </div>
</template>

<script>
import SortableTable from "./components/sortable-table.vue";

export default {
  name: "app",
  components: {
    SortableTable
  },
  data() {
    return {
      users: [],
      sortingKey: undefined,
      descending: false
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

      this.usersData = this.cleanData(results);
    },

    sortBy({ key, type }) {
      if (type === "string") {
        this.users = this.users.sort(function(a, b) {
          if (a[key] < b[key]) {
            return -1;
          } else if (a[key] > b[key]) {
            return 1;
          }

          return 0;
        });
      }

      if (type === "number") {
        this.users = this.users.sort(function(a, b) {
          return a[key] - b[key];
        });
      }

      if (key === this.sortingKey) {
        this.descending = !this.descending;

        if (this.descending) {
          this.users = this.users.reverse();
        }
      }

      this.sortingKey = key;
    },
    cleanData(data) {
      this.users = data.map(function(user) {
        return {
          age: user.dob.age,
          firstName: user.name.first,
          lastName: user.name.last,
          country: user.location.country
        };
      });
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
