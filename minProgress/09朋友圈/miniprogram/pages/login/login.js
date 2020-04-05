// pages/login/login.js
const db = wx.cloud.database()
const userdb = db.collection("userInfo")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "未登录",
    avatarUrl: "./user-unlogin.png",
    gender: "",
    isLogin: false,  // 用户是否已经登录了
    allow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.cloud.callFunction({
      name: "login",
      success: res => {
        // console.log(res)
        wx.setStorageSync("openid", res.result.openid)
        // 后台验证此openid 允许登录 为true
        if (res.result.allow) {
        //   wx.setStorageSync("allow", res.result.allow)
          this.setData({
            allow: res.result.allow
          })
        }
      }
    })

    // 用户加载进来就获取用户信息
    wx.getUserInfo({
      success: res => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName,
          gender: res.userInfo.gender,
          isLogin: true
        })
      },
      fail: console.log
    })
  },

  // 主动点击登录按钮,触发授权信息
  getUserInfo(ev) {
    // console.log(ev)
    if(ev.detail.errMsg === "getUserInfo:ok") {
      this.setData({
        avatarUrl: ev.detail.userInfo.avatarUrl,
        nickName: ev.detail.userInfo.nickName,
        gender: ev.detail.userInfo.gender,
        isLogin: true
      })
    }
  },

  jump: function() {
    if(!this.data.allow) {
      wx.showToast({
        title: '你被管理员封了',
      })
    }else {
      // 存储用户
      let data = {
        openid: wx.getStorageSync("openid"),
        nickName: this.data.nickName,
        avatarUrl: this.data.avatarUrl,
        gender: this.data.gender
      }
      // 添加数据到数据库中, 查询是否存在
      userdb.where({
        openid: data.openid
      }).get().then(res => {
        // 判断是否有重复的用户, 没有就新加一个
          if(res.data.length === 0) {
            userdb.add({
              data: data
            }).then(res => {
              wx.showToast({
                title: '欢迎新用户 !',
              })
            })
          }
      })
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/message/message',
        })
      }, 200)
    }
  }

})

// wx.getUserInfo: 如果用户已经授权了,可以直接用这个方法获取用户头像等信息,
// 但是第一次登录的人是获取不了的,必须要手动点击才能弹出是否授权