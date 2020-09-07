
class ProgramInfo {
    constructor({name, createTime, listenerCount, id, duration}) {
        this.name = name;
        this.createTime = createTime;
        this.listenerCount = listenerCount;
        this.id = id;
        this.duration = duration;
    }
}

export function createProgramInfo(data) {
    return new ProgramInfo({
        name: data.name,
        createTime: data.createTime,
        listenerCount: data.listenerCount,
        id: data.mainSong.id,
        duration: data.mainSong.duration
    })
}
