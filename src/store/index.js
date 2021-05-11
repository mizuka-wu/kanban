import Vue from 'vue'
import Vuex from 'vuex'
import { getVuexStoreConfig } from 'electron-store-vuex-sync'
import { ipcRenderer } from 'electron'

Vue.use(Vuex)

export default new Vuex.Store(getVuexStoreConfig(ipcRenderer), {
  lanes: {
    type: 'array'
  }
})
