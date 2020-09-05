class DjInfo {
    constructor({rid, name, category, picUrl}) {
        this.rid = rid;
        this.name = name;
        this.category = category;
        this.picUrl = picUrl;
    }
}

export function createDjInfo(data) {
    return new DjInfo({
        rid: data.id,
        name: data.name,
        category: data.category,
        picUrl: data.picUrl
    })
}
