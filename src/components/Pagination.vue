<template>
    <div class="d-flex justify-content-end">
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li v-for="(page, i) in pageList" :key="i" class="page-item" :class="[page.disabled ? 'disabled' : page.active ? 'active' : '']" @click="handleChange(page)">
                    <a class="page-link" href="javascript:void(0);">
                        <span v-if="page.type === 'page'">{{page.name}}</span>
                        <span v-else-if="page.type === 'prev'" aria-hidden="true">&laquo;</span>
                        <span v-else-if="page.type === 'next'" aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { computed } from 'vue'
export default {
    props: {
        pageParams: Object,
    },
    setup(props, { emit }) {
        const getPageList = (page, pages, max = 10) => {
            let pageListBeforeTemp = Array.from({ length: max }, (_, i) => (page - max + i)).filter(v => v > 0)
            let pageListAfterTemp = Array.from({ length: max }, (_, i) => (page + i)).filter(v => v <=pages)
            return [...pageListBeforeTemp, ...pageListAfterTemp]
        }
        const pageList = computed(() => {
            const { pageParams } = props
            const { count = 0, page = 1, pageSize = 10 } = pageParams || {}
            let maxPage = Math.ceil(count / pageSize)
            let pages = getPageList(page, maxPage)
            let pageList = pages.map(i => ({ name: i, value: i, type: 'page', active: i === page, disabled: false }))
            let prevPage = { name: '上一页', value: page - 1, type: 'prev', active: false, disabled: !(page > 1 && maxPage > 1) }
            let nextPage = { name: '下一页', value: page + 1, type: 'next', active: false, disabled: !(page < maxPage && maxPage > 1) }
            pageList.push(nextPage)
            pageList.unshift(prevPage)
            return pageList
        })
        const handleChange = v => {
            if (v.disabled) return
            const { pageParams } = props
            pageParams.page = v.value
            emit('update:pageParams', pageParams)
            emit('on-change', v.value)
        }

        return {
            pageList,
            handleChange,
        }
    }
}
</script>

<style>

</style>