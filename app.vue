<template>
  <div class="products">
    <TheHeader class="products__header" />
    <div v-if="data" class="products__main">
      <TheFilter class="products__filter" />
      <TheProducts />
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>


<script>
export default {
  setup() {
    const { $store } = useNuxtApp()
    const { public: publicConfig } = useRuntimeConfig();
    const { data, error } = useFetch(`${publicConfig.API_BASE_URL}/product`, {
      onResponse({ response }) {
        $store.commit('writeProducts', response._data);
        const highestPrice = $store.getters.getHighestPriceProduct
        $store.commit('changePriceRange', [0, highestPrice]);
      },
    })
    return { data }
  }
}
</script>

<style lang="scss">
.products {
  &__header {
    margin-bottom: 50px;
  }

  &__main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__filter {
    margin-right: 30px;
  }
}
</style>
