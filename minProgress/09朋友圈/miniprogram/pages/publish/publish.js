// pages/publish/publish.js
const db = wx.cloud.database()
const messagedb = db.collection("message")

// 录音功能, 录音管理器
const recorderManager = wx.getRecorderManager()
// 播放器功能
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picList: [],
    content: "",
    voiceFilePaths: "",  // 音频播放地址
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    // 页面加载的时候就监听录音何时结束
    recorderManager.onStop(res => {
      this.setData({
        voiceFilePaths: res.tempFilePath
      })
    })

  },

  input: function(e) {  // 记录input输入框的值
    this.data.content = e.detail.value
  },

  publish: function() {  // 发表动态
  // 上传图片,得到图片的 FieldID 
  let promiseList = []
  this.data.picList.forEach(item => {
    let imgend = item.match(/\.[^\.]+$/g)
    promiseList.push(new Promise((resolve, reject) => {
      wx.cloud.uploadFile({
        filePath: item,
        cloudPath: "images/" + new Date().valueOf() + imgend,
        success: resolve
      })
    }))
  })
  Promise.all(promiseList)
    .then(list => {
      let data = {}
      data.poenid = wx.getStorageSync("openid")
      data.content = this.data.content
      data.fileList = list.map(i => i.fileID)
      // 本地时间可能不准确
      data.time = new Date().valueOf()
      messagedb.add({
        data: data,
        success: () => {
          wx.showToast({
            title: '发表状态成功!',
          })
          setTimeout(() => {
            wx.navigateTo({
              url: '/pages/message/message',
            })
          }, 500)
        }
      })
    })
  },

  uploadPic: function() { 
    wx.chooseImage({
      success: (res) => {
        this.setData({
          picList: res.tempFilePaths
        })
      },
    })
  },

  startRecord: function () {  // 开始录音
    // console.log("开始录音")
    recorderManager.start()
  },

  endRecord: function() {
    // console.log("结束录音")
    recorderManager.stop()
  },

  playVoice: function() {
    // 添加音频地址
    innerAudioContext.src = this.data.voiceFilePaths
    innerAudioContext.play()
    // innerAudioContext.onPlay(res => {
    //   console.log("播放")
    // })
    innerAudioContext.onError(res => {
      console.log(res)
    })
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