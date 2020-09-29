<template>
    <todo-form></todo-form>
    <todo-list></todo-list>
</template>

<script>
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'

export default {
    name: 'App',
    components: {
        TodoForm,
        TodoList,
    },
}
</script>
