import { reactive, toRefs } from 'vue'

function createStore() {
    let state = reactive({
        loading: false,
        userinfo: null,
    })

    const setLoading = loading => {
        console.log('loading :>> ', loading);
        state.loading = loading
    }
    
    const setUserInfo = userinfo => {
        state.userinfo = userinfo
    }

    return {
        ...toRefs(state),
        setLoading,
        setUserInfo,
    }
}

export default createStore()

