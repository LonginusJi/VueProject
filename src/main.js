import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import HighchartsVue from 'highcharts-vue'// use the highcharts tag in HighChart.vue

const app = createApp(App)
app.use(router)
app.use(store)
app.use(vuetify)
app.use(HighchartsVue)
app.mount('#app')
document.body.parentNode.style.overflowY = "hidden";
