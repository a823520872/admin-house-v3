<template>
    <ul>
        <li v-for="(li, i) in list" :key="i">
            <span>{{li.text}}</span>
            <span>----</span>
            <span v-if="li.state === 0" @click="handleComplete(li)">完成</span>
            <span v-else-if="li.state === 1" @click="handleDel(li)">删除</span>
        </li>
    </ul>
</template>

<script>
import { toRefs } from 'vue'
import store from '../store.js'
export default {
    setup() {
        let { list } = toRefs(store.state)
        const handleComplete = li => {
            store.editTodo({ ...li, state: 1 })
        }
        const handleDel = li => {
            store.delTodo(li.id)
        }
        return {
            list,
            handleComplete,
            handleDel,
        }
    }
}
</script>