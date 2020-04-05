// components/person/person.js
let db = wx.cloud.database()
let userdb = db.collection("userInfo")

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    nickName: '未登录',
    avatarUrl: './user-unlogin.png',
    islogin: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    upload: function() {
      wx.navigateTo({
        url: '/pages/upload/upload',
      })
    },

    getUserInfo: function(ev) {
      console.log(ev)
      if(ev.detail.errMsg === 'getUserInfo:ok') {
        // 存储用户
        let data = {
          openid: wx.getStorageSync("openid"),
          nickName: ev.detail.userInfo.nickName,
          avatarUrl: ev.detail.userInfo.avatarUrl,
          gender: ev.detail.userInfo.gender
        }
        // 添加数据到数据库中, 查询用户是否存在
        userdb.where({
          openid: data.openid
        }).get().then(res => {
          console.log(res)
          if(res.data.length === 0) {
            userdb.add({
              data:data
            }).then(res => {
              console.log(res)
            })
          }
        })
        this.setData({
          nickName: ev.detail.userInfo.nickName,
          avatarUrl: ev.detail.userInfo.avatarUrl,
          islogin: true
        })
      }
    },
  },

  lifetimes: {
    attached: function() {
      wx.cloud.callFunction({
        name: 'login',
        success: res => {
          console.log(res)
          wx.setStorageSync("openid", res.result.event.userInfo.openId)
        }
      })
      // 用户加载进来就获取用户信息
      wx.getUserInfo({
        success: res => {
          console.log(res)
          this.setData({
            nickName: res.userInfo.nickName,
            avatarUrl: res.userInfo.avatarUrl,
            islogin: true
          })
        }
      })
    }
  }
})
