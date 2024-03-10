import '@/styles/common.scss'
//引入懒加载插件并注册
import { lazyPlugin } from './directives'
//引入全局组件插件并注册
import { componentPlugin } from '@/components/index'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


//测试接口函数
// import { getCategory } from '@/apis/testAPI'
// getCategory().then(res=>{
//     console.log(res)
// })
const app = createApp(App)
const pinia = createPinia()

//pinia是基于内容储存的，在页面刷新后会消失，所以要采用插件进行持久化储存到localstore
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.use(pinia)
app.mount('#app')

