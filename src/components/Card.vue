<template>
    <div class="card border-0 shadow rounded">
        <div class="card-header bg-white" v-if="title">{{title}}</div>
        <div class="card-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
    },
}
</script>