import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import HighchartsVue from 'highcharts-vue'// use the highcharts tag in HighChart.vue

Vue.config.productionTip = false

Vue.use(HighchartsVue)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
document.body.parentNode.style.overflowY = "hidden";