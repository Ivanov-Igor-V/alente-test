import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      products: [],
      searchString: '',
      brandIds: [],
      categoryIds: [],
      multiRange: []
    };
  },
  mutations: {
    writeProducts(state, payload) {
      state.products = payload
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
    changeMultiRange(state, payload) {
      state.multiRange = payload
    },
  },
  getters: {
    getProducts: state => {
      let arr = [...state.products]
      if (state.searchString) {arr = arr.filter(product => product.title.toUpperCase().match(state.searchString.toUpperCase()))}
      if (state.brandIds.length) {arr = arr.filter(product => state.brandIds.includes(product.brandId))}
      if (state.categoryIds.length) {arr = arr.filter(product => state.categoryIds.includes(product.categoryId))}
      if (state.multiRange.length) {
        //TODO Тут нужно переписать логику - некорректна ситуация с несколькими условиями
        state.multiRange.forEach(el => {
          if (el.length === 1) {
          return arr = arr.filter(product => product.price > el[0] )
          } 
          else arr = arr.filter(product => product.price > el[0] && product.price < el[1])
        })
      }
      return arr 
    },
    getProductsOfCategory: state => categoryId => state.products.filter(product => +product.categoryId === categoryId),
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