<template>
    <v-teleport :to="target">
        <div class="spinner-modal d-flex justify-content-center align-items-center" v-if="loading">
            <div class="spinner-border text-primary">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </v-teleport>
</template>

<script>
import store from '../store.js'
import VTeleport from './Teleport.vue'
export default {
    components: {
        VTeleport,
    },
    props: {
        target: {
            type: String,
            default: '',
        },
    },
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
    background-color: rgba(255, 255, 255, .5);
}
</style>
