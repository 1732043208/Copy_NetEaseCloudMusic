class VideoDetailInfo {
    //  作者头像 作者昵称，视频描述，收藏人数，评论人数，创建时间，分享人数，点赞人数
    constructor({avatarUrl, nickname, title, praisedCount, commentCount, publishTime, shareCount, subscribeCount}) {
        this.avatarUrl = avatarUrl;
        this.nickname = nickname;
        this.title = title;
        this.praisedCount = praisedCount;
        this.commentCount = commentCount;
        this.publishTime = publishTime;
        this.shareCount = shareCount;
        this.subscribeCount = subscribeCount;

    }
}

export function createVideoDetailInfo(data) {
    return new VideoDetailInfo({
        avatarUrl: data.avatarUrl,
        nickname: data.creator.nickname,
        title: data.title,
        praisedCount: data.praisedCount,
        commentCount: data.commentCount,
        publishTime: data.publishTime,
        shareCount: data.shareCount,
        subscribeCount: data.subscribeCount,
    })
}
