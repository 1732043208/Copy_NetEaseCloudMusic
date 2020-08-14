// 登录后用户信息数据模型
export class userInfoModel {
    constructor(userInfo) {
        this.userId = userInfo.userId;
        this.userName = userInfo.nickname;
        this.avatarUrl = userInfo.avatarUrl;
        this.backgroundUrl = userInfo.backgroundUrl;
        this.birthday = userInfo.birthday;
        this.city = userInfo.city;
        this.follows = userInfo.follows;
    }
}
