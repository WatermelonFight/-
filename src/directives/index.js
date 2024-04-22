import { useIntersectionObserver } from '@vueuse/core'


//定义全局指令
// el：指令绑定到的元素。这可以用于直接操作 DOM。
// binding：一个对象 .value为等于号后所绑定的值
export const lazyPlugin = {
    install(app){
        app.directive('img-lazy',{
            mounted(el,binding){
                // console.log(el,binding);
                const{ stop } = useIntersectionObserver(
                    el,
                    //useIntersectionObserve返回一个数组，包含多个元素状态观察对象，用{}结构
                    ([{ isIntersecting }]) => {
                        if(isIntersecting){
                            // console.log(isIntersecting);
                            el.src = binding.value
                            stop()//不能直接useIntersectionObserver.stop
                        }
                    },
                )
            }
        })
    }
}

