// 歌单广场
export class AllPlayInfo {
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
