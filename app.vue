<template>
  <div class="products">
    <TheHeader class="products__header" />
    <div v-if="data" class="products__main">
      <div class="products__aside">
        <TheFilter class="products__filter" />
        <TheButton @click="clearFilters" class="products__filter-button">CLEAR ALL FILTERS</TheButton>
      </div>
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
        $store.commit('changeDetaultPriceRange', [0, $store.getters.getHighestPriceProduct]);
        $store.commit('changePriceRange', [0, $store.getters.getHighestPriceProduct]);
      },
    })

    const clearFilters = () => {
      $store.commit('clearAllFilters');
      //TODO Осуществить двустороннее связывание со стором
    }
    return { data, clearFilters }
  }
}
</script>

<style lang="scss" scoped>
.products {
  &__header {
    margin-bottom: 50px;
  }

  &__aside {
    margin-right: 30px;
  }

  &__main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__filter {
    margin-bottom: 29px;
  }

  &__filter-button {
    border-radius: 8px;
    height: 56px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.135216);
    font-size: 18px;
    line-height: 21px;
  }
}
</style>
