<template >
    <div class="products">
        <div class="pre-header">
            <div>{{ $store.state.products.length }} results found in 5ms </div>
            <div class="pre-header__right-side">
                <el-dropdown trigger="click">
                    <TheCard padding="10px 15px 13px" width="142px" :style="{ cursor: 'pointer' }">
                        <div class="pre-header__dropdown-toggler">
                            <p>Default</p>
                            <UIIcon :width="10" :height="5" svg="/icons/chevron-down.svg" />
                        </div>
                    </TheCard>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item> Я не знаю, что ключает этот дропдаун</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-dropdown trigger="click">
                    <TheCard padding="11px">
                        <UIIcon svg="/icons/grid.svg" />
                    </TheCard>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="changeGridMode(mode)" v-for="(mode, index) in gridModes" :key="index">
                                {{ mode[0] }}x{{ mode[1] }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <TheCard padding="11px">
                    <UIIcon svg="/icons/list.svg" />
                </TheCard>
            </div>
        </div>

        <TheInput class="products__search" @input="changeSearchString" width="100%">
            <template #suffix>
                <img src="/icons/search.svg" />
            </template>
        </TheInput>

        <div class="products__table" :style="{ 'grid-template-columns': `repeat(${currentGridMode[0]}, 1fr)` }">
            <ProductCard v-for="product in $store.getters.getSplittedProducts(productsOnPage)[currentPage - 1]"
                :key="product.id" :data="product" />
        </div>
        <ThePagination :pageCount="$store.getters.getSplittedProducts(productsOnPage).length" :activePage="currentPage"
            v-if="$store.getters.getProducts.length && ($store.getters.getProducts.length > productsOnPage)"
            @changePage="currentPage = $event" @minusPage="currentPage--" @plusPage="currentPage++" />
        <div v-if="!$store.getters.getProducts.length"> No results </div>
    </div>
</template>
<script>
export default {
    name: "TheProducts",
    setup() {
        const { $store } = useNuxtApp();
        const productsOnPage = computed(() => currentGridMode.value[1])
        const searchInput = ref('');
        const currentPage = ref(1);
        const input = ref(null);
        const gridModes = [[3, 6], [4, 8]];
        const currentGridMode = ref(gridModes[0])
        const changeSearchString = ({ target }) => {
            $store.commit('changeSearchString', target.value)
        }

        const changeGridMode = (mode) => {
            currentGridMode.value = mode
        }
        return {
            productsOnPage,
            searchInput,
            currentPage,
            input,
            changeSearchString,
            gridModes,
            currentGridMode,
            gridModes, changeGridMode
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
        gap: 31px;
        margin-bottom: 37px;
    }

    &__search {
        margin-bottom: 26px;
    }
}

.pre-header {
    height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 22px;

    &__dropdown-toggler {
        display: inline-flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        font-size: 14px;
        line-height: 17px;
    }

    &__right-side {
        display: inline-flex;
        gap: 14px;
    }
}
</style>