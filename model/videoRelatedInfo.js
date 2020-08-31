class VideoRelatedInfo {
    constructor({title, userName, playTime, coverUrl, vid}) {
        this.title = title;
        this.userName = userName;
        this.playTime = playTime;
        this.coverUrl = coverUrl;
        this.vid = vid;
    }
}

export function createVideoRelated(data) {
    return new VideoRelatedInfo({
        title: data.title,
        userName: data.creator[0].userName,
        playTime: data.playTime,
        coverUrl: data.coverUrl,
        vid: data.vid
    })
}
