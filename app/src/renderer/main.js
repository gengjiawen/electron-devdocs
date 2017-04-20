import { ipcRenderer as ipc } from 'electron'
import Vue from 'vue'
import Electron from 'vue-electron'
import Router from 'vue-router'
import App from './App'
import routes from './routes'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(Electron)
Vue.use(Router)
Vue.use(ElementUI)
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

ipc.on('showDebug', (event, arg) => {
  console.log('got message')
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
