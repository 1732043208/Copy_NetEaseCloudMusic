
export const initScroll = {
    data() {
        return {
            itemWidth: 0,
            itemMargin: 0
        }
    },
    methods: {
        initPics() {
            // 先判断是否有这个属性
            // 这里之所以要设置宽度，是因为.wrapper和.list的宽度一样大
            // 当.list的宽度大于.wrapper的宽度，才能横向滚动
            let itemWidth = this.itemWidth;// 这里是设置列表每一项的宽度
            let margin = this.itemMargin;
            // width是整个列表的宽度
            let width = (itemWidth + margin) * 6 - margin;
            this.$refs.list.style.width = width + 'vw'; // 设置.list的宽度的宽度
        },
    }
};
