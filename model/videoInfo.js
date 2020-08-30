class VideoInfo {
    // 视频播放地址，视频封面，视频id，播放时长，标题，评论数量，分享数量, 作者头像，作者昵称,作者id,点赞数量
    constructor({srcUrl, coverUrl, vid, playTime, title, commentCount, shareCount, avatarUrl, nickname, userId, praisedCount}) {
        this.srcUrl = srcUrl;
        this.coverUrl = coverUrl;
        this.vid = vid;
        this.playTime = playTime;
        this.title = title;
        this.commentCount = commentCount;
        this.shareCount = shareCount;
        this.avatarUrl = avatarUrl;
        this.nickname = nickname;
        this.userId = userId;
        this.praisedCount = praisedCount;
        this.isLike = false;
    }

}

export function createVideo(data) {
    return new VideoInfo({
        srcUrl: data.urlInfo.url,
        coverUrl: data.coverUrl,
        vid: data.vid,
        playTime: data.playTime,
        title: data.title,
        commentCount: data.commentCount,
        shareCount: data.shareCount,
        avatarUrl: data.creator.avatarUrl,
        nickname: data.creator.nickname,
        userId: data.creator.userId,
        praisedCount: data.praisedCount
    })
}
