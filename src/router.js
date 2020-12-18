import { createRouter, createWebHashHistory } from 'vue-router';
import store from './store.js'
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
                },
                {
                    path: 'house',
                    component: () => import(/* webpackChunkName: "house.list" */ './views/house/List.vue'),
                    meta: {
                        keepAlive: true,
                        _menu: '/house'
                    }
                },
                {
                    path: 'house/add',
                    component: () => import(/* webpackChunkName: "house.detail" */ './views/house/Item.vue'),
                    meta: {
                        _title: '添加房源',
                        _menu: '/house'
                    }
                },
                {
                    path: 'house/:id',
                    component: () => import(/* webpackChunkName: "house.detail" */ './views/house/Item.vue'),
                    meta: {
                        _title: '编辑房源',
                        _menu: '/house'
                    }
                },
                {
                    path: 'address/flag',
                    component: () => import(/* webpackChunkName: "flag" */ './views/address/flag.vue'),
                    meta: {
                        keepAlive: true,
                        _menu: '/address/flag'
                    }
                },
                {
                    path: 'address/street',
                    component: () => import(/* webpackChunkName: "street" */ './views/address/street.vue'),
                    meta: {
                        keepAlive: true,
                        _menu: '/address/street'
                    }
                },
                {
                    path: 'address/metro',
                    component: () => import(/* webpackChunkName: "metro" */ './views/address/metro.vue'),
                    meta: {
                        keepAlive: true,
                        _menu: '/address/metro'
                    }
                },
                {
                    path: 'statistics',
                    meta: {
                        keepAlive: true,
                        _menu: '/statistics'
                    },
                    component: () => import(/* webpackChunkName: "statistics.list" */ './views/statistics/List.vue')
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
            store.setMenu(`${to.meta._menu}`)
            return true
        } else {
            return { path: '/login' }
        }
    }
    return true
})


export default router