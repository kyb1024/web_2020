// pages/message/message.js
const db = wx.cloud.database()
const messagedb = db.collection("message")
const userdb = db.collection("userInfo")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList: [],
    usericon: '',
  },

  publish: function() {
    wx.navigateTo({
      url: '/pages/publish/publish',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取message
    messagedb.where({}).get().then(res => {
      res.data.map(item => {
        userdb.where({
          openid: item._openid
        }).get().then(resp => {
          item.userInfo = resp.data[0]
          item.time = new Date(item.time).toString().split("GMT")[0]
          this.setData({
            messageList: res.data,
            usericon: resp.data[0].avatarUrl
          })
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})