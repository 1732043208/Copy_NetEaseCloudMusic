class CommentHotInfo {
    constructor({avatarUrl, nickname, time, content, likedCount, id, isLike}) {
        this.avatarUrl = avatarUrl;
        this.nickname = nickname;
        this.time = time;
        this.content = content;
        this.likedCount = likedCount;
        this.id = id;
        this.isLike = false;
    }
}

export function createCommentHotInfo(data) {
    return new CommentHotInfo({
        avatarUrl: data.user.avatarUrl,
        nickname: data.user.nickname,
        time: data.time,
        content: data.content,
        likedCount: data.likedCount,
        id: data.commentId,
        isLike: false
    })
}
