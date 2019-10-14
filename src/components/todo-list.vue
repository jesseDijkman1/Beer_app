<template>
  <ul>
    <TodoItem
      v-on:markComplete="$emit('markComplete', todo.id)"
      v-on:deleteTodo="$emit('deleteTodo', todo.id)"
      v-bind:key="todo.id"
      v-bind:todo="todo"
      v-for="todo in todos"
    />
  </ul>
</template>

<script>
import TodoItem from "./todo-item.vue";

export default {
  name: "TodoList",
  components: {
    TodoItem
  },
  props: ["todos"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
