// 歌单信息
export class SongListInfo {
    constructor({picUrl, title, subTitle, avatarUrl, avatarName, avatarId, playCount, shareCount, commentCount, musicId, subscribedCount}) {
        this.picUrl = picUrl;
        this.title = title;
        this.subTitle = subTitle;
        this.avatarUrl = avatarUrl;
        this.avatarName = avatarName;
        this.avatarId = avatarId;
        this.playCount = playCount;
        this.shareCount = shareCount;
        this.commentCount = commentCount;
        this.musicId = musicId;
        this.subscribedCount = subscribedCount;
    }
}

export function createSongListInfo(data) {
    return new SongListInfo({
        picUrl: data.coverImgUrl,
        title: data.name,
        subTitle: data.description,
        avatarName: data.creator.nickname,
        avatarUrl: data.creator.avatarUrl,
        avatarId: data.creator.userId,
        playCount: data.playCount,
        shareCount: data.shareCount,
        commentCount: data.commentCount,
        musicId: filterMusicId(data.trackIds),
        subscribedCount: data.subscribedCount
    })
}

function filterMusicId(songList) {
    let res = [];
    if (!songList) {
        return [];
    }
    songList.forEach(item => {
        res.push(item.id)
    })
    return res
}
