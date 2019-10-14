<template>
  <div id="app">
    <TodoForm v-on:addTodo="addTodo" />
    <TodoList v-on:markComplete="markComplete" v-on:deleteTodo="deleteTodo" v-bind:todos="todos" />
  </div>
</template>

<script>
import TodoList from "./components/todo-list.vue";
import TodoForm from "./components/todo-form.vue";

export default {
  name: "app",
  components: {
    TodoList,
    TodoForm
  },
  data() {
    return {
      todos: [
        { id: 1, description: "Make this todo list", done: false },
        {
          id: 2,
          description: "Get to know vue without TypeScript",
          done: false
        }
      ]
    };
  },
  methods: {
    markComplete(id) {
      this.todos.forEach(function(todo) {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
      });
    },

    deleteTodo(id) {
      this.todos = this.todos.filter(function(todo) {
        return todo.id !== id;
      });
    },

    addTodo(description) {
      const todoObject = {
        id: this.todos.length + 1,
        description,
        done: false
      };

      this.todos.push(todoObject);
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
