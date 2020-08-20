// 歌单广场
class AllPlayInfo {
    // id歌单id 图片 描述文案 播放人数
    constructor({id, coverImgUrl, description, playCount}) {
        this.id = id;
        this.coverImgUrl = coverImgUrl;
        this.description = description;
        this.playCount = playCount;
    }
}

export function createAllPlayInfo(data) {
    return new AllPlayInfo({
        id: data.id,
        coverImgUrl: data.coverImgUrl,
        description: data.description,
        playCount: data.playCount
    })
}
