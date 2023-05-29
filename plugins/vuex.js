import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      products: [],
      searchString: ''
    };
  },
  mutations: {
    writeProducts(state, payload) {
      state.products = payload
    },
    changeSearchString(state, payload) {
      state.searchString = payload
    },
  },
  getters: {
    getProducts: state => {
      if (!state.searchString) return state.products
      return state.products.filter(product => product.title.toUpperCase().match(state.searchString.toUpperCase()))
    },
    getProductsByCondition: state => (condition,value) => state.products.filter(product => product.condition === value),
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