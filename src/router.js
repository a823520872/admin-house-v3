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

// router.beforeEach((to, from, next) => {
//     return true
// })


export default router