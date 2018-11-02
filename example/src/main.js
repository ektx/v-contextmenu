import Vue from 'vue'
import App from './App.vue'
import VContextmenu from '../../src/index'

Vue.config.productionTip = false

Vue.use(VContextmenu)

new Vue({
  render: h => h(App)
}).$mount('#app')
