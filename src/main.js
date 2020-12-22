import Vue from 'vue'
import App from './App.vue'
import draggable from 'vuedraggable'
import clickEdit from 'click-to-edit'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.config.productionTip = false

Vue.use(VueQuillEditor /* { default global options } */)
Vue.component('Draggable', draggable)
Vue.use(ElementUI)
Vue.component('ClickEdit', clickEdit)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
