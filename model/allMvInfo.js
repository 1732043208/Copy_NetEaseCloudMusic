class AllMvInfo {
    // MvId,作者，播放时长，封面，播放人数
    constructor({id, artistName, duration, cover, playCount,desc}) {
        this.id = id;
        this.artistName = artistName;
        this.duration = duration;
        this.cover = cover;
        this.playCount = playCount;
        this.desc = desc;
    }
}

export function createAllMvInfo(data) {
    return new AllMvInfo({
        id: data.id,
        artistName: data.artistName,
        duration: data.duration,
        cover: data.cover,
        playCount: data.playCount,
        desc:data.name
    })
}