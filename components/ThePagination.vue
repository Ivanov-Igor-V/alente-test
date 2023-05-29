<template>
    <div class="pagination">
        <div class="pagination__section">
            <button @click="decreasePageHandler" class="pagination__button">
                <UIIcon :width="6" :height="12" svg="/icons/chevron-left.svg" />
            </button>
        </div>
        <div class="pagination__section">
            <div v-for="(page, index) of pageCount" :key="index">
                <button class="pagination__button" @click="$emit('changePage', index + 1)"
                    :class="[index + 1 === activePage ? 'active' : '']">
                    {{ index + 1 }}
                </button>
            </div>
        </div>
        <div class="pagination__section">
            <button class="pagination__button" @click="increasePageHandler">
                <UIIcon :width="6" :height="12" svg="/icons/chevron-right.svg" />
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: "ThePaginaton",
    props: {
        pageCount: {
            type: Number,
            default: 10
        },
        activePage: {
            default: 1,
            type: Number
        }
    },
    setup(props, { emit }) {
        const increasePageHandler = () => {
            if (props.activePage + 1 > props.pageCount) return
            emit('plusPage')
        }
        const decreasePageHandler = () => {
            if (props.activePage - 1 < 1) return
            emit('minusPage')
        }

        return {
            increasePageHandler,
            decreasePageHandler
        }
    }
}
</script>
<style lang="scss" scoped>
.pagination {
    display: inline-flex;
    gap: 18px;
    transition: all 0.3s;

    .active {
        background: var(--color-1);
        color: #FFF;
    }

    &__button {
        height: 42px;
        width: 40px;
        border-radius: 50%;
        background: var(--color-2);

    }

    &__section {
        display: inline-flex;
        background: var(--color-2);
        border-radius: 20px;
    }

}
</style>