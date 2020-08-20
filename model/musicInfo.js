
// 每日歌曲推荐
class musicInfo {
    // id:音乐id,name:音乐名字,singer:歌手,album:专辑
    constructor({id, name, singer, album, albumId,picUrl,mvId,singerId}) {
        this.id = id;
        this.name = name;
        this.singer = singer;
        this.album = album;
        this.albumId = albumId
        this.picUrl = picUrl;
        this.mvId = mvId;
        this.singerId = singerId;
    }
}

export function createMusicInfo(musicData) {
    // console.log(musicData);
    return new musicInfo({
        id: musicData.id,
        name: musicData.name,
        singer: filterSinger(musicData.ar),
        album: musicData.al.name,
        albumId:musicData.al.id,
        picUrl: musicData.al.picUrl,
        mvId:musicData.mv,
        singerId:musicData.ar[0].id
    })
}

function filterSinger(singer) {
    let ret = [];
    if (!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}
