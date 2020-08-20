class AlbumInfo {
    constructor({albumPic, albumName, description, songer, commentCount, shareCount}) {
        this.albumPic = albumPic;
        this.albumName = albumName;
        this.description = description;
        this.songer = songer;
        this.commentCount = commentCount;
        this.shareCount = shareCount;
    }
}

export function createAlbumInfo(data) {
    console.log(data);
    return new AlbumInfo({
        albumPic: data.picUrl,
        albumName: data.name,
        description: data.description,
        songer: data.artist.name,
        commentCount: data.info.commentCount,
        shareCount: data.info.shareCount
    })
}
