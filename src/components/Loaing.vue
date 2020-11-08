<template>
    <teleport to="body">
        <div class="spinner-modal" v-if="loading">
            <div class="spinner-border text-light">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </teleport>
</template>

<script>
import store from '../store.js'
export default {
    setup() {
        const { loading } = store
        return {
            loading,
        }
    }
}
</script>

<style>
.spinner-modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
}
</style>
