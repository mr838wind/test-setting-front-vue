import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//== [s] bootstrap-vue
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
//== [e] bootstrap-vue

//== plugins
import InjectLayout from '@/plugins/inject-layout'


//== @ is an alias to /src in import

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
