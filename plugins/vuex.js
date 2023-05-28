import { createStore } from "vuex";
const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
        store
    }
  }
});