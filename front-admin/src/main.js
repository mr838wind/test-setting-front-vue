import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//== plugins
import '@/plugins/inject-filters'
import '@/plugins/inject-bootstrap'
import '@/plugins/inject-global-components'
import '@/plugins/layout/inject-layout'


//== @ is an alias to /src in import
//
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
