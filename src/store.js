import { reactive, } from 'vue'

const store = {
    debug: true,
    state: reactive({
        list: [
            { id: 1, text: '强大肯定是', state: 0 },
            { id: 2, text: '的方式开始副科级', state: 0 },
            { id: 3, text: '双方都卢卡申科看过的', state: 1 },
        ]
    }),
    addTodo(todo) {
        this.state.list.push({
            id: this.state.list.length + 1,
            text: todo,
            state: 0,
        })
    },
    editTodo(todo) {
        let _todoIndex = this.state.list.findIndex(v => v.id === todo.id)
        this.state.list.splice(_todoIndex, 1, todo)
    },
    delTodo(id) {
        let _todoIndex = this.state.list.findIndex(v => v.id === id)
        this.state.list.splice(_todoIndex, 1)
    }
}

export default store

