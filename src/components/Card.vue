<template>
    <div class="card">
        <!-- <template v-slot:header> -->
        <div class="card-header" v-if="header1">{{header1}}</div>
        <!-- </template> -->
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { toRefs } from 'vue'
export default {
    setup(props) {
        const { header1 } = toRefs(props)
        console.log(header1);
        return {
            header1,
        }
    }
}
</script>

<style>

</style>