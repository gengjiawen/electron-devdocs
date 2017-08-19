import { ipcRenderer as ipc } from 'electron'
import Vue from 'vue'
import Electron from 'vue-electron'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Electron)
Vue.use(ElementUI)
Vue.config.debug = true

ipc.on('showDebug', (event, arg) => {
  console.log('got message')
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
