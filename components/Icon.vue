<template >
    <img class="icon" :height="height" :width="width" :src="svg">
</template>
<script>
export default {
    name: "Icon",
    props: {
        svg: {
            type: String,
        },
        height: {
            type: Number,
            default: 16
        },
        width: {
            type: Number,
            default: 16
        }
    }
}
</script>
<style lang="scss" scoped>
.icon {
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }

    &:active {
        transform: scale(1.3);
    }
}
</style>