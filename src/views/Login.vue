<template>
    <div class="login">
        <v-card class="login-form" :title="title">
            <v-form @submit.native.prevent="handleSubmit" label-width="68px" label-position="right">
                <v-form-item label="用户名">
                    <input class="form-control" type="text" v-model="form.account">
                </v-form-item>
                <v-form-item label="密码">
                    <input class="form-control" type="password" v-model="form.password">
                </v-form-item>
                <v-form-item>
                    <button class="btn btn-primary" type="submit">登录</button>
                </v-form-item>
            </v-form>
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
import VForm from '../components/Form'
import VFormItem from '../components/FormItem'
export default {
    components: {
        VCard,
        VForm,
        VFormItem,
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

<style>
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
.login :deep .card-header {
    text-align: center;
}
</style>