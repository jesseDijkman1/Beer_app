<template>
  <li v-bind:class="['todo-item',`todo-item--${todo.id}`, {'is-done': todo.done}]">
    <p v-on:click="$emit('markComplete')">{{todo.description}}</p>
    <button class="todo-item__delete" v-on:click="$emit('deleteTodo')">Delete</button>
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todo"]
};
</script>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
}

.todo-item:nth-of-type(odd) {
  background: #eee;
}

.todo-item:nth-of-type(even) {
  background: #ccc;
}

.todo-item__delete {
  border: none;
  font-size: 1em;
  background: none;
  text-decoration: underline;
  font-weight: bold;
}

.todo-item__delete:hover {
  cursor: pointer;
  color: red;
}

.todo-item p:hover {
  cursor: pointer;
}

.todo-item.is-done p {
  text-decoration: line-through;
}
</style>