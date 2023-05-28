<template >
    <div class="products">
        <div class="pre-header">
            <div>#count results found in 5ms </div>
            <div class="pre-header__right-side">
                <TheCard padding="0px">
                    <select>
                        <option value="" selected disabled hidden>Default</option>
                        <option label="Какая-то опция" />
                    </select>
                </TheCard>
                <TheCard padding="11px">
                    <UIIcon svg="/icons/grid.svg" />
                </TheCard>
                <TheCard padding="11px">
                    <UIIcon svg="/icons/list.svg" />
                </TheCard>
            </div>
        </div>
        <el-input v-model="searchInput" :style="{ marginBottom: '26px' }" placeholder="Search hear">
            <template #suffix>
                <UIIcon svg="/icons/search.svg" />
            </template>
        </el-input>
        <div class="products__table">
            <ProductCard v-for="product in data" :key="product.id" :data="product" />
        </div>
        <ThePagination />
    </div>
</template>
<script>
export default {
    name: "TheProducts",
    props: {
        data: {
            type: Array,
            default: () => ([]),
        }
    },
    setup() {
        const searchInput = ref('')
        return {
            searchInput
        }
    }
}
</script>
<style lang="scss" scoped>
.products {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__table {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 31px;
        margin-bottom: 37px;
    }
}

.pre-header {
    height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 22px;

    &__right-side {
        display: inline-flex;
        gap: 14px;
    }
}
</style>