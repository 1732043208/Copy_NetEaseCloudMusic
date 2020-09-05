
class ProgramInfo {
    constructor({name, createTime, listenerCount, musicId, duration}) {
        this.name = name;
        this.createTime = createTime;
        this.listenerCount = listenerCount;
        this.musicId = musicId;
        this.duration = duration;
    }
}

export function createProgramInfo(data) {
    return new ProgramInfo({
        name: data.name,
        createTime: data.createTime,
        listenerCount: data.listenerCount,
        musicId: data.mainSong.id,
        duration: data.mainSong.duration
    })
}
