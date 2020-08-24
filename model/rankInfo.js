class RankInfo {
    // coverImgUrl排行榜图片，updateTime更新时间，updateTime排行榜id，tracks前三名信息
    // name榜单名字
    constructor({coverImgUrl, updateTime, id, tracks,name}) {
        this.coverImgUrl = coverImgUrl;
        this.updateTime = updateTime;
        this.id = id;
        this.tracks = tracks;
        this.name = name;

    }
}

export function createRankInfo(data) {
    return new RankInfo({
        coverImgUrl: data.coverImgUrl,
        updateTime: data.updateFrequency,
        id: data.id,
        tracks: data.tracks,
        name:data.name
    })
}

