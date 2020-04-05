// pages/question/question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: "",
    questionList: [],
    current: 0,  // 当前第几题
    total: 0,
    min: 3,
    sec: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options)

    wx.cloud.callFunction({
      name: "getQuestion",
      success: res => {
        console.log('get ok', res)
        let arr = res.result.ans.data
        this.setData({
          questionList: arr,
          total: arr.length
        })
      },
      fail: res => {
        console.log('err', res)
      }
    })

    // Todo 显示一个答题开始的界面

    // 处理答题倒计时
    this.data.time = setInterval(() => this.handleTimeLimit(), 1000)
  },

  confirm: function () {
    wx.showModal({
      title: '退出后答题记录将消失',
      content: '是否退出',
      success: res => {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },

  // 选择下一题
  next: function() {
    this.setData({
      current: this.data.current+1
    })
  },

  // 手动滑动切换题目
  change: function(e) {
    this.setData({
      current: e.detail.current
    })
  },

  handleTimeLimit: function() {
    if(this.data.min === 0 && this.data.sec === 0) {
      clearInterval(this.data.time)  // 清除定时器
      wx.showModal({
        title: '时间到了,请提交答案',
        content: '点击取消结果会消失',
        success: res => {
          if(confirm) {
            console.log("时间到了")
          }
        }
      })
      return
    }
    // 时间到了
    this.data.sec--
    if(this.data.sec < 0) {
      this.data.min--
      this.data.sec = 59
    }
    this.setData({
      min: this.data.min,
      sec: this.data.sec
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