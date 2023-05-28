<template>
    <div class="card" :style="{ padding: paddingValue, height, width }">
        <slot />
    </div>
</template>
<script>
export default {
    name: 'TheCard',
    props: {
        padding: {
            type: [String, Number],
            default: '24px'
        },
        width: {
            type: [String, Number],
            default: 'initial'
        },
        height: {
            type: [String, Number],
            default: 'initial'
        },
    },
    computed: {
        paddingValue: function () {
            if (typeof this.$props.padding === "number") return `${this.$props.padding}px`
            return this.$props.padding
        }
    },
}
</script>
<style lang="scss" scoped>
.card {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.135216);
    border-radius: 8px;
    background: var(--color-4);
}
</style>