// 防抖
export function debounce(func, delay) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}// 将整数转换成 时：分：秒的格式
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
