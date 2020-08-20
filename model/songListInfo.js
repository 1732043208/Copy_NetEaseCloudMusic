// 歌单信息
class SongListInfo {
    // 图片 标题 描述文案 创作者头像 作者昵称 作者id 播放人数 分享人数 评论人数 歌单里单个音乐的id 收藏人数
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
