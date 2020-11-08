<template>
    <div class="login">
        <v-card class="login-form" :title="title">
            <form @submit.prevent="handleSubmit">
                <div class="form-group mb-4 d-flex align-items-center">
                    <label class="form-label text-right pr-2 mr-1 col-form-label">用户名</label>
                    <div class="flex-fill">
                        <input class="form-control" type="text" v-model="form.account">
                    </div>
                </div>
                <div class="form-group mb-4 d-flex">
                    <label class="form-label text-right pr-2 mr-1 col-form-label">密码</label>
                    <div class="flex-fill">
                        <input class="form-control" type="password" v-model="form.password">
                    </div>
                </div>
                <div class="form-group d-flex">
                    <label class="form-label text-right pr-2 mr-1 col-form-label"></label>
                    <div class="flex-fill">
                        <button class="btn btn-primary" type="submit">登录</button>
                    </div>
                </div>
            </form>
        </v-card>
        <v-loading></v-loading>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Ajax from '../utils/fetch.js'
import store from '../store.js'
import VCard from '../components/Card.vue'
import VLoading from '../components/Loading.vue'
export default {
    components: {
        VCard,
        VLoading,
    },
    setup() {
        const { loading, setUserInfo } = store

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
                }).then(res => {
                    let { userinfo, userinfo: { token } } = res.data || {}
                    setUserInfo(userinfo)
                    sessionStorage.setItem('tk', token)
                    router.push('/')
                }, e => {
                    console.log(e);
                })
            }
        }

        return {
            title,
            loading,
            form,
            handleSubmit,
        }
    }
}
</script>

<style scoped>
.login {
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-columns: 1fr 400px 1fr;
    grid-template-rows: 1fr 288px 288px 1fr;
}
.login-form {
    /* grid-column: 2 / 3;
    grid-row: 2 / 3; */
    grid-area: 2 / 2 / 3 / 3;
}
.form-label {
    width: 68px;
}
.login :deep .card-header {
    text-align: center;
}
</style>