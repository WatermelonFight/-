//把components里的组件进行全局化注册
import ImageView from "@/components/ImageView/index.vue"
import XtxSku from "@/components/XtxSku/index.vue"

export const componentPlugin = {
    install(app){
        app.component('XtxImageView',ImageView)
        app.component('XtxSku',XtxSku)//组件名字，组件配置对象
    }
}