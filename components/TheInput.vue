<template >
    <TheCard padding="0px" :width="width">
        <div class="input">
            <input placeholder="Search hear" />
            <div class="input__suffix">
                <slot name="suffix"></slot>
            </div>
        </div>
    </TheCard>
</template>
<script>
export default {
    name: "TheInput",
    props: {
        width: {
            type: String,
            default: 'inherit'
        }
    }
}
</script>
<style lang="scss" scoped>
input::placeholder {
    font-weight: 300;
}

.input {
    position: relative;

    &__suffix {
        position: absolute;
        top: 50%;
        right: 37px;
        transform: translateY(-50%);
    }
}

input {
    border-radius: 8px;
    border: none;
    padding: 17px 40px 19px 34px;
    font-weight: 400;
    font-size: 22px;
    line-height: 26px;

    &:focus-visible {
        border: none;
        outline: none;
    }
}
</style>