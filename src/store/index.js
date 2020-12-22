import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persistfile'
import store from './store'

const persist = new VuexPersist({
  path: `${__static}/store`
})
Vue.use(Vuex)

export default new Vuex.Store({
  ...store,
  plugins: [persist.subscribe()]
})
