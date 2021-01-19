import { createStore } from 'vuex';
import { App } from "vue";
import modules from '/@/store/modules'

const store = createStore({
  getters: {
    default: state => state.default
  },
  state: {
    default: 'hello world!'
  },
  mutations: {
    setDefault(state, params) {
      state.default = params
    }
  },
  actions: {
    activeSetDefault({ commit }) {
      commit('setDefault', 'world hello!')
    }
  },
  modules
})

export function setupStore(app: App) {
  app.use(store)
  console.log(store, 'vuex')
}

export default store