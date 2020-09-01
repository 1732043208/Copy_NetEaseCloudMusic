class MvInfo {
    constructor({title, playCount, publishTime, desc, img1v1Url, singer, subCount}) {
        this.title = title;
        this.playCount = playCount;
        this.publishTime = publishTime;
        this.desc = desc;
        this.img1v1Url = img1v1Url;
        this.singer = singer;
        this.subCount = subCount;

    }
}

export function createMvInfo(data) {
    return new MvInfo({
        title: data.name,
        playCount: data.playCount,
        publishTime: data.publishTime,
        desc: data.desc,
        img1v1Url: data.artists[0].img1v1Url,
        singer: data.artists[0].name,
        subCount: data.subCount,

    })
}
