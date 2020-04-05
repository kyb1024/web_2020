//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    code: ""
  },

  onLoad: function(options) {
    console.log(options)
    this.setData(options)
  },
  
  takePhoto: function() {
    wx.navigateTo({
      url: '/pages/photo/photo',
    })
  },

  scanCode: function() {
    wx.navigateTo({
      url: '/pages/scan/scan',
    })
  },

  map: function() {
    wx.navigateTo({
      url: '/pages/map/map',
    })
  },

  playVideo: function() {
    wx.navigateTo({
      url: '/pages/video/video',
    })
  }
})
