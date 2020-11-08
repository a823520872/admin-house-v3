<template>
    <div class="card">
        <div class="card-header" v-if="title">{{title}}</div>
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