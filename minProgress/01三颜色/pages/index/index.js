//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    r: 0,
    g: 0,
    b: 0
  },
  onLoad: function() {
    console.log("加载完成!")
  },
  change: function(e) {
    let color = e.target.dataset.color
    let value = e.detail.value
    this.setData({[color]: value})
  }
})
