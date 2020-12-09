<template>
    <div class="page_header">
        <el-page-header @back="goBack" :content="title"></el-page-header>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        const route = useRoute()

        const title = computed(() => route.meta._title)

        const goBack = () => {
            router.go(-1)
        }

        return {
            title,
            goBack,
        }
    },
    // computed: {
    //     title() {
    //         return this.$route.meta._title;
    //     }
    // },
    // methods: {
    //     goBack() {
    //         this.$router.go(-1);
    //     }
    // }

        // return () => (
        //     <div className="page_header">
        //         <el-page-header onBack={goBack} content={title}></el-page-header>
        //     </div>
        // )
};
</script>