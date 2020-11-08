<template>
    <teleport v-if="target">
        <slot></slot>
    </teleport>
    <template v-else>
        <slot></slot>
    </template>
</template>

<script>
export default {
    props: {
        target: String
    }
}
</script>