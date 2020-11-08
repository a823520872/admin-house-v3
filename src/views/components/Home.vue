<template>
    <div class="home">
        <div class="home-navbar bg-secondary">
            <div class="logo pl-4 text-white">村里租房</div>
            <v-navbar></v-navbar>
        </div>
        <div class="home-topbar d-flex justify-content-end align-items-center px-4">
            <nav class="nav">
                <a href="javascript:void(0);" class="nav-link" @click="handleLogout">退出登录</a>
            </nav>
        </div>
        <div class="home-body bg-light p-3">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import VNavbar from '../../components/Navbar.vue'
export default {
    components: {
        VNavbar,
    },
    setup() {
        const router = useRouter()
        const handleLogout = () => {
            sessionStorage.removeItem('tk')

            router.replace('/login')
        }

        return {
            handleLogout,
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
}
.home-navbar {
    grid-area: 1 / 1 / 3 / 2;
}
.logo {
    line-height: 60px;
    font-size: 32px;
}
.home-body {

}
</style>