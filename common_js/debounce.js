/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-10-15 10:51:42
 * @LastEditTime: 2019-10-15 11:33:16
 * @LastEditors: Please set LastEditors
 */
/**
 * @name:带有立即执行的防抖函数 
 * @test: test font
 * @msg: 
 * @param {func:函数，wait:等待时间,immediate:是否立即执行 } 
 * @return: 
 */
function debounce(func,wait = 50,isImmediate = true){
    let timer,context , args;
    const later = ()=>setTimeout(() => {
        // 延迟函数执行完毕，清空缓存的定时器序号
    timer = null
    // 延迟执行的情况下，函数会在延迟函数中执行
    // 使用到之前缓存的参数和上下文

    },wait);

    return function(...params){
        // 如果没有创建延迟执行函数（later），就创建一个
        if(!timer){
            timer = later() ;
            // 如果是立即执行，调用函数
            // 否则缓存参数和调用上下文
            if(isImmediate){
                func.apply(this,params);
            }else{
                context = this;
                args = params;
            }
        // 如果已有延迟执行函数（later），调用的时候清除原来的并重新设定一个
        // 这样做延迟函数会重新计时
        }else{
            clearTimeout(timer);
            timer = later();
        }
    }
}