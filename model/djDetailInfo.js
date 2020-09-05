class DjDetailInfo {
    constructor({picUrl, name, subCount, avatarUrl, nickname, signature, category, desc}) {
        this.picUrl = picUrl;
        this.name = name;
        this.subCount = subCount;
        this.avatarUrl = avatarUrl;
        this.nickname = nickname;
        this.signature = signature;
        this.category = category;
        this.desc = desc;

    }

}

export function createDjDetailInfo(data) {
    return new DjDetailInfo({
        picUrl: data.picUrl,
        name: data.name,
        subCount: data.subCount,
        avatarUrl: data.dj.avatarUrl,
        nickname: data.dj.nickname,
        signature: data.dj.signature,
        category: data.category,
        desc: data.desc,

    })
}

