<template>
    <aside class="filter">
        <TheCard :padding="28" width="389px">
            <div class="filter__range">
                <h4 class="filter__header">Multi Range</h4>
                <el-checkbox-group class="" v-model="multiRange" @change="multiRangeHandler">
                    <el-checkbox v-for="(range, index) of priceRange" :Key="index" :label="range.label" />
                </el-checkbox-group>
            </div>
            <el-divider />
            <!-- По макету не понятно, как должен работать слайдер -->
            <div class="filter__slider">
                <div class="slider-header">
                    <h4>Slider</h4>
                    <p>1.99-4098</p>
                </div>
                <el-slider v-model="silderValue" />
            </div>
            <el-divider />
            <div v-if="categories">
                <h4 class="filter__header">Category</h4>
                <div class="table">
                    <el-checkbox-group v-model="categoryCheckList" @change="changeCategoryIds">
                        <el-checkbox :label="category.name" v-for="category of categories" :key="category.id" />
                    </el-checkbox-group>
                    <div class="table__count">
                        <div v-for="(count, index) of categories?.length" :key="index"> {{
                            $store.getters.getProductsOfCategory(index + 1).length
                        }}</div>
                    </div>
                </div>
            </div>
            <el-divider />
            <div v-if="brands">
                <h4 class="filter__header">Brand</h4>
                <div class="table">
                    <el-checkbox-group v-model="brandCheckList" @change="changeBrandIds">
                        <el-checkbox :label="brand.title" v-for="brand of brands" :key="brand.id" />
                    </el-checkbox-group>
                    <div class="table__count">
                        <div v-for="(count, index) of brands?.length" :key="index">{{
                            $store.getters.getProductsOfBrand(index + 1).length
                        }}</div>
                    </div>
                </div>
            </div>
            <el-divider />
            <div>
                <h4 class="filter__header">Rating</h4>
                <div class="table">
                    <div>
                        <button class="grade-button" v-for="(grade, index) of 5" :key="index">
                            <img src="/icons/star.svg" v-for="star of (5 - index)" :key="star" height="17" width="19">
                            <img src="/icons/empty-star.svg" v-for="star of  index" :key="star" height="17" width="19">
                        </button>
                    </div>

                    <div class="table__count">
                        <div v-for="(count, index) of 5" :key="index">{{ $store.getters.getProductsOfRating(5 -
                            index).length }}
                        </div>
                    </div>
                </div>
            </div>


        </TheCard>
    </aside>
</template>
<script>
export default {
    name: "TheFilter",
    setup() {
        const { $store } = useNuxtApp();
        const silderValue = ref(0);
        const priceRange = [
            { label: '$10', value: [0, 10] },
            { label: '$10-$100', value: [10, 100] },
            { label: '$100-$500', value: [100, 500] },
            { label: '$500', value: [500] },
            { label: 'All', value: [0] },
        ]
        const multiRange = ref([]);
        const priseCheckList = ref([]);
        const categoryCheckList = ref([]);
        const brandCheckList = ref([]);
        const { public: publicConfig } = useRuntimeConfig();
        const { data: categories, error: categoryError } = useFetch(`${publicConfig.API_BASE_URL}/category`);
        const { data: brands, error: brandError } = useFetch(`${publicConfig.API_BASE_URL}/brand`);

        // Далее приходится обрабатывать модели групп чекбоксов, тк element-plus сделал все коряво, писать свой компонент нет времени
        const changeBrandIds = (e) => {
            const arr = []
            brands.value.forEach(el => e.includes(el.title) && arr.push(el.id))
            $store.commit('changeBrandIds', arr)
        }
        const changeCategoryIds = (e) => {
            const arr = []
            categories.value.forEach(el => e.includes(el.name) && arr.push(el.id))
            $store.commit('changeCategoryIds', arr)
        }

        const multiRangeHandler = (e) => {
            const arr = []
            priceRange.forEach(el => e.includes(el.label) && arr.push(el.value))
            $store.commit('changeMultiRange', arr)
        }

        return {
            priceRange,
            silderValue,
            priseCheckList,
            categoryCheckList,
            brandCheckList,
            categories,
            brands,
            multiRange,
            changeBrandIds,
            changeCategoryIds,
            multiRangeHandler
        }
    }
}
</script>
<style lang="scss" scoped>
.filter {
    max-width: 389px;
    display: flex;

    &__header {
        margin-bottom: 25px;
    }

    &__range {
        display: flex;
        flex-direction: column;

        .el-checkbox-group {
            display: flex;
            flex-direction: column;
        }
    }
}

.slider-header {
    display: flex;
    justify-content: space-between;

    p:first-child {
        font-weight: 500;
    }
}

.table {
    justify-content: space-between;
    display: flex;
    flex-direction: row;

    .el-checkbox-group {
        display: flex;
        flex-direction: column;
    }

    &__count {
        div {

            padding: 8px 0;
        }
    }
}

.grade-button {
    display: flex;
    height: 32px;
    align-items: center;
}
</style>