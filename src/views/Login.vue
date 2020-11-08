<template>
    <div class="login">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <v-card :title="title">
            <form @submit.prevent="handleSubmit">
                <div class="form-item">
                    <label>用户名</label>
                    <input type="text" v-model="form.account">
                </div>
                <div class="form-item">
                    <label>用户名</label>
                    <input type="password" v-model="form.password">
                </div>
                <div class="form-item">
                    <button type="submit">登录</button>
                </div>
                <div class="form-item">
                    <button @click="setLoading(!loading)">loading</button>
                </div>
            </form>
        </v-card>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Ajax from '../utils/fetch.js'
import store from '../store.js'
import VCard from '../components/Card.vue'
export default {
    components: {
        VCard,
    },
    setup() {
        const { loading, setUserInfo, setLoading } = store

        const router = useRouter()

        const title = ref('村里租房管理系统')

        const form = reactive({
            account: '',
            password: '',
        })

        const handleSubmit = () => {
            if (form.account && form.password) {
                Ajax('/api/admin/User/login', { ...form }, {
                    method: 'post',
                    loading: true,
                }).then(json => {
                    let { userinfo, userinfo: { token } } = json.data || {}
                    setUserInfo(userinfo)
                    sessionStorage.setItem('tk', token)
                    router.push('/')
                }, e => {
                    console.log(e);
                })
            }
        }

        const editTitle = e => title.value = e || '213'

        onMounted(() => {
            console.log(loading);
        })

        return {
            title,
            loading,
            form,
            handleSubmit,
            editTitle,
            setLoading,
        }
    }
}
</script>

<style>
.login {
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-rows: 1fr 288px 1fr;
    grid-template-columns: 1fr 400px 1fr;
}
</style>