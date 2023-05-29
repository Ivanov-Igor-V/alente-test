<template >
    <div class="products">
        <div class="pre-header">
            <div>{{ $store.state.products.length }} results found in 5ms </div>
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

        <TheInput class="products__search" @input="changeSearchString" width="100%">
            <template #suffix>
                <img src="/icons/search.svg" />
            </template>
        </TheInput>

        <div class="products__table">
            <ProductCard v-for="product in $store.getters.getSplittedProducts(productsOnPage)[currentPage - 1]"
                :key="product.id" :data="product" />
        </div>
        <ThePagination :pageCount="$store.getters.getSplittedProducts(productsOnPage).length" :activePage="currentPage"
            v-if="$store.getters.getProducts.length" @changePage="currentPage = $event" @minusPage="currentPage--"
            @plusPage="currentPage++" />
        <div v-else> No results </div>
    </div>
</template>
<script>
export default {
    name: "TheProducts",
    setup() {
        const { $store } = useNuxtApp()
        const productsOnPage = ref(6)
        const searchInput = ref('')
        const currentPage = ref(1)
        const input = ref(null)
        const changeSearchString = ({ target }) => {
            $store.commit('changeSearchString', target.value)
        }
        return {
            productsOnPage,
            searchInput,
            currentPage,
            input,
            changeSearchString
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

    &__right-side {
        display: inline-flex;
        gap: 14px;
    }
}
</style>