<template>
    <div class="login">
        <v-card header1="村里租房管理系统">
            231
        </v-card>
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
        </form>
    </div>
    <!-- <el-card class="login">
        <div slot="header">村里租房管理系统</div>
        <el-form :model="form" :rules="rules" ref="loginForm" label-width="80px" @keydown.enter.native="handleClick('loginForm')">
            <el-form-item label="用户名">
                <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="btn_login" @click.native="handleClick('loginForm')" :loading="loading">登录</el-button>
            </el-form-item>
        </el-form>
    </el-card> -->
</template>

<script>
import { reactive } from 'vue'
import VCard from '../components/Card.vue'
export default {
    components: {
        VCard,
    },
    setup() {
        const form = reactive({
            account: '',
            password: '',
        })

        return {
            form,
        }
    }
}
</script>

<style>

</style>