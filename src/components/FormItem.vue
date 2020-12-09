<template>
    <div class="form-group mb-4 d-flex align-items-center" :style="formStyle">
        <label class="form-label pr-2 mr-1 col-form-label" :class="{'text-right': labelPosition === 'right'}">{{ label }}</label>
        <div class="flex-fill">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { inject, toRefs } from 'vue'
export default {
    props: {
        label: { type: String, default: '' },
        labelWidth: { type: String, default: '' },
    },
    setup(props) {
        const { labelWidth: labelWidth1 } = toRefs(props)
        // const { labelWidth: labelWidth1 } = props
        const labelWidth2 = inject('label-width')
        const labelPosition = inject('label-position')
        
        const labelWidth = labelWidth1 || labelWidth2

        const formStyle = `--labelWidth: ${labelWidth};`

        // console.log('labelWidth1 :>> ', labelWidth1);
        // console.log('labelWidth2 :>> ', labelWidth2);

        return {
            formStyle,
            labelPosition,
        }
    },
}
</script>

<style>
.form-label {
    width: var(--labelWidth);
}
</style>