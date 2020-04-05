//index.js
const app = getApp()

Page({
  data: {
    currentPage: "recommend",  // 全局控制当前显示的是哪个页面
    pubTitle: "web前端",
    tabbarList: [
      {
        title: "推荐",
        pageTitle: "web前端",
        content: "recommend",
        path: "./recommend.png",
        activepath: "./recommend-active.png"
      }, {
        title: "答题",
        pageTitle: "答题系统",
        content: "message",
        path: "./message.png",
        activepath: "./message-active.png"
      }, {
        title: "个人",
        pageTitle: "个人信息",
        content: "person",
        path: "./person.png",
        activepath: "./person-active.png"
      }
    ],
    current: 0
  },

  // 点击下面的按钮进行切换
  handlechange: function(e) {
    // console.log(e)
    const current = this.data.tabbarList.findIndex(item => item.content===e.detail.content)
    this.setData({
      current: current,
      currentPage: e.detail.content,
      pubTitle: this.data.tabbarList[current].pageTitle
    })
  },

  // 滑动页面进行切换
  swiperchange: function(e) {
    // console.log(e)
    const current = e.detail.current
    this.setData({
      current: current,
      currentPage: this.data.tabbarList[current].content,
      pubTitle: this.data.tabbarList[current].pageTitle
    })
  }

})
