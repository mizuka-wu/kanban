import Vue from 'vue'
import Vuex from 'vuex'
import { getVuexStoreConfig } from 'electron-store-vuex-sync'
import { ipcRenderer } from 'electron'

Vue.use(Vuex)

const store = getVuexStoreConfig(ipcRenderer, {
  lanes: {
    type: 'array'
  }
})

export default new Vuex.Store(store)
