//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    state: false,
  },

  onLoad: function() {
    wx.getSetting({
      success: res => {
        console.log(res)
        if(res.authSetting["scope.record"] && res.authSetting["scope.werun"]) {
          this.setData({
            state: true
          })
        }
      }
    })

    wx.authorize({  // 运动步数
      scope: 'scope.werun',
      success: res => {
        console.log(res)
      }
    }) 
    wx.authorize({  // 录音功能
      scope: 'scope.record',
      success: res => {
        console.log(res)
      }
    })
    wx.authorize({
      scope: 'scope.userLocation',
      success: res => {
        console.log(res)
      }
    })
  },

  // 打开授权列表, 写到某些点击事件触发之后才能执行
  authbtn: function () {
    wx.openSetting({
      success: res => {
        if (res.authSetting["scope.record"] && res.authSetting["scope.werun"]) {
          this.setData({
            state: true
          })
        }else {
          state: false
        }
      }
    })
  }

})
