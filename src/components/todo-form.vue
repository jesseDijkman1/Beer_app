<template>
  <form v-on:submit.prevent="[$emit('addTodo', description), description = '']">
    <input type="text" v-model="description" />
    <button>Add</button>
  </form>
</template>

<script>
export default {
  name: "AddTodo",
  data() {
    return {
      description: ""
    };
  }
};
</script>