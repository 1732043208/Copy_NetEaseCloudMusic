
// 每日歌曲推荐
export class musicInfo {
    // id:音乐id,name:音乐名字,singer:歌手,album:专辑
    constructor({id, name, singer, album, picUrl}) {
        this.id = id;
        this.name = name;
        this.singer = singer;
        this.album = album;
        this.picUrl = picUrl;
    }
}

export function createMusicInfo(musicData) {
    // console.log(musicData);
    return new musicInfo({
        id: musicData.id,
        name: musicData.name,
        singer: filterSinger(musicData.ar),
        album: musicData.al.name,
        picUrl: musicData.al.picUrl
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
