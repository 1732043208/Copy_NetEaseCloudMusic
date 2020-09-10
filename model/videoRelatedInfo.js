class VideoRelatedInfo {
    constructor({title, userName, durationms, coverUrl, vid,type}) {
        this.title = title;
        this.userName = userName;
        this.durationms = durationms;
        this.coverUrl = coverUrl;
        this.vid = vid;
        this.type = type;
    }
}

export function createVideoRelated(data) {
    return new VideoRelatedInfo({
        title: data.title,
        userName: data.creator[0].userName,
        durationms: data.durationms,
        coverUrl: data.coverUrl,
        vid: data.vid,
        type:data.type
    })
}
