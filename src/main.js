import { ipcRenderer as ipc } from 'electron'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.debug = true

ipc.on('message', (event, arg) => {
  console.log('got message', arg)
})

window.checkUpdate = () => {
  ipc.send('checkUpdate', 1)
}

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
