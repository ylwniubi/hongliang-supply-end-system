import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import 'echarts'   //全局注册图表
import ECharts from 'vue-echarts'
import {map} from '@/lib/map.js'
import {registerMap} from 'echarts/core'
registerMap('map',map)

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('v-chart', ECharts)
app.use(pinia)
app.use(ElementPlus)  //全局注册ElementPlus所有的组件
app.use(router)
app.mount('#app')
