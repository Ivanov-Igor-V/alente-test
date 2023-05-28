<template>
    <div>
        <button class="button" :class="[type === 'primary' ? 'primary' : 'secondary']" :style="{ borderRadius }">
            <slot name="icon" />
            <slot />
        </button>
    </div>
</template>
<script>
export default {
    name: "TheButton",
    props: {
        type: {
            type: String,
            default: 'primary'
        },
        borderRadius: {
            type: String,
            default: '0px'
        }
    }
}
</script>
<style lang="scss" scoped>
button {
    width: 100%;
    height: 100%;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
}

.primary {
    color: #FFF;
    background-color: var(--color-1);
}

.secondary {
    color: #000;
    background-color: var(--color-2);
}
</style>