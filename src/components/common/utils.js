// 防抖
export function debounce(func, delay) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
// 将整数转换成 时：分：秒的格式
export function realFormatSecond(second) {
    let secondType = typeof second;
    if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second);
        let hours = Math.floor(second / 3600);
        second = second - hours * 3600;
        let mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
        return '00:00'
    }
}
// 数组对象通过唯一id值去重
export function unique(arr) { // 根据唯一标识id来对数组进行过滤
    const res = new Map();  //定义常量 res,值为一个Map对象实例
    //返回arr数组过滤后的结果，结果为一个数组   过滤条件是，map中是否有arr中的id值，如果res中没有某个键，就设置这个键的值为1
    return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
}
