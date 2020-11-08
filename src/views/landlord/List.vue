<template>
    <div class="list">
        {{ count }}
        <!-- <v-table v-loading="loading"></v-table> -->
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
// import Ajax from '../../utils/fetch.js'
// import VTable from '../../components/Table.vue'

export default {
    components: {
        // VTable,
    },
    setup () {
        const state = reactive({
            count: 0,
        })

        // cosnt getData = () => {
        //     Ajax('/api/admin/landlord/getList', {}).then(res => {

        //     })
        // }
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style>

</style>