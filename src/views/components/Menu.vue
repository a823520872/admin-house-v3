<template>
    <!-- default-active="1" -->
    <el-menu mode="vertical" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :default-active="menu">
        <template v-for="li in menuList">
            <template v-if="li.children && li.children.length">
                <el-submenu :index="li.path" :key="li.path">
                    <template #title>
                        <i class="el-icon-menu"></i>
                        {{ li.name }}
                    </template>
                    <el-menu-item v-for="lc in li.children" :key="lc.path" :index="lc.path" @click="handleClick(lc)">
                        <i class="el-icon-menu"></i>
                        {{ lc.name }}
                    </el-menu-item>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item :index="li.path" :key="li.path" @click="handleClick(li)">
                    <i class="el-icon-menu"></i>
                    {{ li.name }}
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '../../store.js'
export default {
    setup() {
        const { menu } = store

        const router = useRouter()

        const menuList = ref([
            {
                path: '/landlord',
                name: '房东管理'
            },
            {
                path: '/house',
                name: '房源管理'
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
                ]
            },
            {
                path: '/statistics',
                name: '数据统计'
            }
        ])

        const handleClick = v => {
            router.push(v.path)
        }
        return {
            menu,
            menuList,
            handleClick,
        }
    },
};
</script>

<style></style>
