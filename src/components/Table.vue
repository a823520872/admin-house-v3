<template>
    <table class="table">
        <colgroup>
            <col>
        </colgroup>
        <thead>
            <th></th>
        </thead>
        <tbody v-for="(li, i) in data" :key="i">
            <td></td>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        data: Array,
        // ['v-loading']: Boolean,
    },
}
</script>

<style>
.table th, td { vertical-align: middle; }
</style>