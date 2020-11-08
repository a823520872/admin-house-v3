import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/components/Home.vue'
import Login from './views/Login.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/login',
            component: Login,
        }
    ]
})

router.beforeEach((to) => {
    if (to.path !== '/login') {
        const token = sessionStorage.getItem('tk')
        if (token) {
            return true
        } else {
            return { path: '/login' }
        }
    }
    return true
})


export default router