<template >
    <div class="products">
        <div class="pre-header">
            <div>{{ $store.state.products.length }} results found in 5ms </div>
            <div class="pre-header__right-side">
                <TheCard padding="0px" width="142px" :style="{ cursor: 'pointer' }">
                    <el-select v-model="filterSelectValue" @change="filterSelectHandler" placeholder="Default" size="large">
                        <el-option label="Цена" value="price" />
                        <el-option label="Оценка" value="rating" />
                        <el-option label="Название" value="title" />
                    </el-select>
                </TheCard>


                <el-dropdown trigger="click">
                    <TheCard padding="11px">
                        <Icon svg="/icons/grid.svg" />
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
                    <Icon svg="/icons/list.svg" />
                </TheCard>
            </div>
        </div>

        <TheInput class="products__search" @input="changeSearchString" width="100%">
            <template #suffix>
                <img src="/icons/search.svg" />
            </template>
        </TheInput>

        <div class="products__table" :style="{ 'grid-template-columns': `repeat(${currentGridMode[0]}, 1fr)` }">
            <div v-for="product in splittedProducts[currentPage - 1]" :key="product.id">
                <ProductCard :data="product" />
            </div>
        </div>
        <ThePagination :pageCount="splittedProducts.length" :activePage="currentPage"
            v-if="getFilteredProducts.length && (getFilteredProducts.length > productsOnPage)"
            @changePage="currentPage = $event" @minusPage="currentPage--" @plusPage="currentPage++" />
        <div v-if="!getFilteredProducts.length"> No results </div>
    </div>
</template>
<script>
export default {
    name: "TheProducts",
    setup() {
        const { $store } = useNuxtApp();
        const productsOnPage = computed(() => currentGridMode.value[1] * currentGridMode.value[0])
        const searchInput = ref('');
        const filterSelectValue = ref('');
        const currentPage = ref(1);
        const gridModes = [[3, 2], [4, 2], [3, 3]];
        const currentGridMode = ref(gridModes[0])
        const changeSearchString = ({ target }) => {
            $store.commit('changeSearchString', target.value)
        }

        const changeGridMode = (mode) => {
            currentPage.value = 1
            currentGridMode.value = mode
        }

        const filterSelectHandler = (e) => {
            $store.commit('changeKeyOfSort', e)
        }

        const splittedProducts = computed(() => $store.getters.getSplittedProducts(productsOnPage.value))
        const getFilteredProducts = computed(() => $store.getters.getProducts)

        return {
            productsOnPage,
            searchInput,
            filterSelectValue,
            currentPage,
            changeSearchString,
            gridModes,
            currentGridMode,
            gridModes,
            changeGridMode,
            filterSelectHandler,
            splittedProducts,
            getFilteredProducts
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