import '@/styles/common.scss'
//引入懒加载插件并注册
import { lazyPlugin } from './directives'
//引入全局组件插件并注册
import { componentPlugin } from '@/components/index'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'



//测试接口函数
// import { getCategory } from '@/apis/testAPI'
// getCategory().then(res=>{
//     console.log(res)
// })
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app')

