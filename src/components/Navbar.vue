<template>
    <nav class="navbar-nav navbar-secondary bg-secondary">
        <div :class="[li.toggle ? 'dropup' : 'dropdown']" v-for="li in menuList" :key="li.path">
            <a class="nav-item nav-link text-white px-4" :class="{'dropdown-toggle': li.children}" href="javascript:void(0);" @click="goPage(li)">{{li.name}}</a>
            <div class="collapse navbar-collapse" :class="{'show': li.toggle}" v-if="li.children">
                <div class="navbar-nav">
                    <a class="nav-item nav-link text-white px-4" v-for="l in li.children" :key="l.path" href="javascript:void(0);" @click="goPage(l)">{{l.name}}</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
    setup() {
        let menuList = ref([
            {
                path: '/landlord',
                name: '房东管理',
                toggle: false,
            },
            {
                path: '/house',
                name: '房源管理',
                toggle: false,
            },
            {
                path: '/address',
                name: '位置管理',
                children: [
                    {
                        path: '/address/street',
                        name: '村'
                    },
                    {
                        path: '/address/flag',
                        name: '标志建筑'
                    },
                    {
                        path: '/address/jiedao',
                        name: '区域'
                    },
                    {
                        path: '/address/metro',
                        name: '地铁'
                    },
                ],
                toggle: false,
            },
            {
                path: '/statistics',
                name: '数据统计',
                toggle: false,
            }
        ])

        const router = useRouter()

        const goPage = li => {
            if (li.children) {
                li.toggle = !li.toggle
            } else {
                router.push(li.path)
            }
        }

        return {
            menuList,
            goPage,
        }
    },
}
</script>

<style></style>
