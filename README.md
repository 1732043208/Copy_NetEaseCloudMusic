# Vue高仿安卓移动客户端网易云音乐

### 按照android客户端高仿

这是在个人学习vue之后的第二个实战项目,结合了vue全家桶和vant组件库完成的项目

项目未部署，无法在线预览

### 技术栈

1.Vue全家桶(vue4.x,vue-cli,vue-router,vuex)

2.axios

3.vant组件库

4.Webpack

5.better-scroll(解决移动端滚动)

6.Es5及以上

### 前端部分

##### 1.安装依赖

```
npm install
```

##### 2.运行项目
```
npm run serve
```

### 后端部分

Github地址：[github.com/Binaryify/N…](https://github.com/Binaryify/NeteaseCloudMusicApi)

后端操作见文档。

### 界面实现效果

首页：![image-20200916161852300](C:\Users\PC01\AppData\Roaming\Typora\typora-user-images\image-20200916161852300.png)![image-20200916161946414](C:\Users\PC01\AppData\Roaming\Typora\typora-user-images\image-20200916161946414.png)



### 项目实现功能

- #### 侧边栏模块

  1. ##### 个人信息展示（头像，用户昵称）

  2. ##### 登录、注册、退出登录

- #### 迷你播放器

  - 展示正在播放的歌曲名字，歌曲封面，暂停播放按钮功能，查看播放列表
    - 播放列表可点击播放指定音乐，删除音乐，添加音乐功能为播放过的歌曲都会添加到播放列表

- #### 播放器页面

  - 展示正在播放歌曲的歌曲名字，歌曲封面（正在播放时会旋转，停止播放也会相应停止），暂停播放按钮功能，查看播放列表，歌曲的评论数量
  - 播放器控制器
    - 展示歌曲目前播放时间，歌曲总时长，播放进度条（可点击或拖动改变歌曲播放进度）
    - 可切换播放模式（单曲、列表循环、随机）
    - 适应各种播放模式的 上一首，下一首，暂停继续播放功能
    - 播放列表，功能和模拟播放器一致

  - 歌词

    - 歌词滚动

    - 对应歌词高亮

      

- #### 音乐首页

  1. ##### 轮播图banner

  2. ##### 每日推荐歌曲

     - 每日歌曲推荐详情
       - 实现了播放全部推荐歌曲按钮
       - 实现每个歌曲的查看歌曲评论详情、MV（如果有MV，可跳转到MV详情页播放MV）查看专辑详情

  3. ##### 歌单广场

     - 歌单广场详情
       - 可看到全部、各种风格、官方的歌单，点击每个歌单都可以到歌单详情页

  4. ##### 排行榜

     - 查看排行榜详情，点击可跳转查看排行榜歌单详情

  5. ##### 电台

     - 获取每日推荐电台，点击可跳转查看电台详情
       - 电台详情包括电台简介，电台主播，电台节目(可播放)，

  6. ##### 每日推荐歌单

     - 获取每日推荐歌单，点击可查看歌单详情，查看更多可跳转到歌单广场

  7. ##### 根据听歌风格推荐的歌曲

     - 点击可播放，也可点击全部播放

  8. ##### 官方歌单

     - 每日推荐的官方歌单，点击可跳转查看歌单详情

  9. ##### 每日新歌新碟

     - 点击可播放

- #### 视频首页

  1. ##### 每日推荐视频（只有8个视频，隔一段时间会刷新新的8个视频）

     - 可点击播放也可以点击跳转到视频详情（均可实现播放视频）
       - 视频详情可查看视频简介，点赞、收藏、分享、评论、播放次数的数量及视频创建时间
       - 相关视频，可点击查看详情
       - 视频精彩评论
       - 最近评论

### 技术方案

- ##### 项目目录结构

  参考 [优雅的 Vue 项目目录结构设计](https://juejin.im/entry/6844903585403109390)

- ##### 移动适配方案

  使用**[ postcss-load-config](https://github.com/michael-ciniawsky/postcss-load-config)**

  可以将px单位自动转换成viewport单位

  根据个人配置 设计稿宽度为750px，即100vw = 750px 1vw = 7.5px

  

- ##### 侧边栏实现

  利用自己所学的JS知识，写的侧边栏抽屉效果，遮罩层渐变展示隐藏，内容部分从左到右滑动展现

  可点击遮罩层关闭也可以向左滑动超过一定阈值收起侧边栏

  

- ##### 轮播图实现：

  使用vant组件库的轮播图组件

  

- ##### 歌词解析：使用[lyric-parser](https://github.com/ustbhuangyi/lyric-parser) 该插件未兼容网易云歌词，歌词排序混乱，时间也不匹配

  网易云音乐接口拿到的歌词微秒位有三种情况(:100,:010,:10)，需要fork包，修改代码中this.lines.push的，然后package修改依赖

  

- ##### 移动端滑动解决方案

  使用[better-scroll](https://github.com/ustbhuangyi/better-scroll)处理移动端滚动

  better-scroll 是一个移动端滚动的解决方案，它是基于 iscroll 的重写，它和 iscroll 的主要区别在[这里](https://github.com/ustbhuangyi/better-scroll/issues/36)。

  better-scroll 也很强大，不仅可以做普通的滚动列表，还可以做轮播图、picker 等等。使用方法请看[这里](https://juejin.im/post/6844903480121884685)

  

- ##### 视频播放

  使用[vue-mini-player](https://github.com/webweifeng/vue-mini-player)，基于 Vue 的一个轻量级视频播放组件，适配 PC 和移动端

  GitHub地址：[点击](https://github.com/webweifeng/vue-mini-player)

### 致谢

所有接口数据均来自提供者**[Binaryify](https://github.com/Binaryify/NeteaseCloudMusicApi)**，接口稳定，文档很完善