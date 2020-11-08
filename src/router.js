import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './views/components/Home.vue'
import Login from './views/Login.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            children: [
                {
                    path: 'landlord',
                    component: () => import(/* webpackChunkName: "landlord.list" */ './views/landlord/List.vue'),
                    meta: {
                        keepAlive: true,
                        _menu: '/landlord'
                    }
                },
                {
                    path: 'landlord/add',
                    component: () => import(/* webpackChunkName: "landlord.detail" */ './views/landlord/Detail.vue'),
                    meta: {
                        _title: '添加房东',
                        _menu: '/landlord'
                    }
                },
                {
                    path: 'landlord/:id',
                    component: () => import(/* webpackChunkName: "landlord.detail" */ './views/landlord/Detail.vue'),
                    meta: {
                        _title: '编辑房东',
                        _menu: '/landlord'
                    }
                }
            ]
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