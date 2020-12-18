<template>
    <div class="home">
        <div class="home-navbar">
            <div class="logo pl-4 text-white">村里租房</div>
            <v-menu></v-menu>
        </div>
        <el-header class="el-row--flex is-justify-end">
            <el-button type="text" class="btn_logout" @click="handleLogout">退出登录</el-button>
        </el-header>
        <div class="home-body bg-light p-3">
            <div class="position-relative bg-white p-3">
                <keep-alive v-if="keepAlive">
                    <router-view></router-view>
                </keep-alive>
                <router-view v-else></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import VMenu from './Menu.vue'
export default {
    components: {
        VMenu,
    },
    setup() {
        const router = useRouter()
        const route = useRoute()

        const handleLogout = () => {
            sessionStorage.removeItem('tk')
            router.push('/login')
        }

        const keepAlive = computed(() => route.meta && route.meta.keepAlive)

        return {
            handleLogout,
            keepAlive,
        }
    }
}
</script>

<style scoped>
.home {
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-columns: 240px 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas: 'navbar topbar' 'navbar main';
}
.home-navbar {
    /* grid-area: 1 / 1 / 3 / 2; */
    grid-area: navbar;
    background-color: #545c64;
}
.home-topbar {
    grid-area: topbar;
}
.logo {
    line-height: 60px;
    font-size: 32px;
}
.home-body {
    position: relative;
    overflow-x: hidden;
    grid-area: main;
}
</style>