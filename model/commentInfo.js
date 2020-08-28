class CommentHotInfo {
    constructor({avatarUrl, nickname, time, content, likedCount}) {
        this.avatarUrl = avatarUrl;
        this.nickname = nickname;
        this.time = time;
        this.content = content;
        this.likedCount = likedCount;
    }
}

export function createCommentHotInfo(data) {
    return new CommentHotInfo({
        avatarUrl: data.user.avatarUrl,
        nickname: data.user.nickname,
        time: data.time,
        content: data.content,
        likedCount: data.likedCount
    })
}
