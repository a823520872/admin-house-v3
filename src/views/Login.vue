<template>
    <div class="login">
        <el-card class="login-form" :header="title">
            <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" @keydown.enter="handleSubmit">
                <el-form-item label="用户名" prop="account">
                    <el-input v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="btn_login" @click="handleSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <v-loading></v-loading>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import request from '../api/index.js'
import store from '../store.js'
export default {
    setup() {
        const { 
            loading, 
            setUserInfo, 
        } = store

        const router = useRouter()

        const title = ref('村里租房管理系统')
        const loginForm = ref(null)
        const rules = ref({
            account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
            password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        })

        const form = reactive({
            account: '',
            password: '',
        })

        const handleLogin = () => {
            request.user.login({ ...form }).then(res => {
                let { userinfo, userinfo: { token } } = res.data || {}
                setUserInfo(userinfo)
                sessionStorage.setItem('tk', token)
                router.push('/')
            }, e => {
                console.log(e);
            })
        }

        const handleSubmit = () => {
            loginForm.value.validate(valid => {
                if (!valid) return
                handleLogin()
            })
        }

        return {
            title,
            loading,
            form,
            rules,
            handleSubmit,
            loginForm,
        }
    }
}
</script>

<style>
.login {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
.login-form {
    width: 402px;
    height: 288px;
    transform: translateY(-50%);
}
.login .el-card__header {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
}
</style>