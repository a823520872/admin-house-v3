<template>
    <form>
        <slot></slot>
    </form>
</template>

<script>
import { provide, toRefs } from 'vue'
export default {
    props: {
        labelWidth: { type: String, default: '' },
        labelPosition: { type: String, default: 'left', validator: value => ['left', 'right'].includes(value) },
    },
    setup(props) {
        const { labelWidth, labelPosition } = props
        provide('label-width', labelWidth)
        provide('label-position', labelPosition)

        return {

        }
    },
}
</script>