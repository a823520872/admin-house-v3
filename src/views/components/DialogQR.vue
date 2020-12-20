<template>
    <el-dialog :title="title" v-model="showModal" width="480px" @close="hideModal">
        <el-image :src="qr"></el-image>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="hideModal">取 消</el-button>
                <el-button type="primary" @click="download">下 载</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script>
export default {
    props: {
        title: String,
        qr: [String, Boolean]
    },
    computed: {
        showModal() {
            return !!this.qr;
        }
    },
    methods: {
        download() {
            window.open(this.qr);
            // alert('暂不支持下载');
        },
        hideModal() {
            this.$emit('close');
        }
    }
};
</script>

<style>
</style>
