import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      products: [],
      searchString: '',
      brandIds: [],
      categoryIds: [],
      priceRange: [0, 100],
      keyOfSort: ''
    };
  },
  mutations: {
    writeProducts(state, payload) {
      state.products = payload
    },
    changePriceRange(state, payload) {
      state.priceRange = payload
    },
    changeSearchString(state, payload) {
      state.searchString = payload
    },
    changeBrandIds(state, payload) {
      state.brandIds = payload
    },
    changeCategoryIds(state, payload) {
      state.categoryIds = payload
    },
    changePriceRange(state, payload) {
      state.priceRange = payload
    },
    changeKeyOfSort(state, payload) {
      state.keyOfSort = payload
    },
  },
  getters: {
    getProducts: (state,getters) => {
      let arr = state.products.filter(product => {
       if ( product.price >= state.priceRange[0] && product.price <= state.priceRange[1]) return true
      })
      if (state.searchString) {arr = arr.filter(product => product.title.toUpperCase().match(state.searchString.toUpperCase()))}
      if (state.brandIds.length) {arr = arr.filter(product => state.brandIds.includes(product.brandId))}
      if (state.categoryIds.length) {arr = arr.filter(product => state.categoryIds.includes(product.categoryId))}
      if (state.keyOfSort) { console.log('keyOfSort'); arr = getters.getProductsSortedByKey(state.keyOfSort)}
      return arr 
    },
    getHighestPriceProduct: (state,getters) => getters.getProductsSortedByKey('price')[state.products.length - 1].price,
    getProductsOfCategory: state => categoryId => state.products.filter(product => +product.categoryId === categoryId),
    getProductsSortedByKey: (state) => key => {
      let arr = state.products    
        arr = state.products.sort((product1, product2) => product1[key] > product2[key] ? 1 : -1 );
      return arr

    },
    getProductsOfBrand: state => brandId => state.products.filter(product =>  +product.brandId === brandId),
    getProductsOfRating: state => rating => state.products.filter(product =>  +product.rating >= rating && +product.rating < rating + 1),
    getSplittedProducts: (state,getters) => (itemsOnPage) => {
      const splittedProducts = []
      for (let i = 0; i < getters.getProducts.length; i += itemsOnPage) {
        splittedProducts.push(getters.getProducts.slice(i, i + itemsOnPage));
      }
      return splittedProducts
    }
  }
});

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
        store
    }
  }
});