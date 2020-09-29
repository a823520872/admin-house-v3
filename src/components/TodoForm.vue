<template>
    <form @submit.prevent="handleSubmit">
        <input type="text" id="ipt" v-model="value">
        <button type="submit">提交</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import store from '../store.js'
export default {
    setup() {
        let value = ref('')
        console.log(store.state);
        let handleSubmit = () => {
            if (value.value) {
                store.addTodo(value.value)
                value.value = ''
            }
        }
        return {
            value,
            handleSubmit,
        }
    }
}
</script>