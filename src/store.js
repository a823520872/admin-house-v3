import { reactive, toRefs } from 'vue'

function createStore() {
    let state = reactive({
        loading: false,
        userinfo: null,
        menu: '/',
    })

    const setLoading = loading => {
        state.loading = loading
    }
    
    const setUserInfo = userinfo => {
        state.userinfo = userinfo
    }

    const setMenu = menu => {
        state.menu = menu
    }

    return {
        ...toRefs(state),
        setLoading,
        setUserInfo,
        setMenu,
    }
}

export default createStore()

