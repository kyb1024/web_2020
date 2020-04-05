//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    tabBarList: [
      {
        name: "recommend",
        title: "推荐音乐"
      },{
        name: "hot",
        title: "热歌榜"
      },{
        name: "search",
        title: "搜索"
      }
    ],
    current: "recommend",
    // 当前播放音乐的id
    id: 1234
  },
  //事件处理函数
  handle: function(e) {
    this.setData({
      current: e.detail.current
    })
  },

  onLoad: function() {
    setTimeout(() => {
      this.setData({
        id: 4059
      })
    }, 5000)
  }
  
})
