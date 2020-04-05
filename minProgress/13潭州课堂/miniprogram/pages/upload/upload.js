// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    selection: [
      {
        value: ''
      },{
        value: ''
      }
    ],
    description: '',
    code: '',
    ans: '',
  },

  // choose的数据更新
  chooseInput: function(e) {
    const index = e.currentTarget.dataset.num
    const value = e.detail.value
    this.data.selection[index].value = value
    this.setData({
      selection: this.data.selection
    })
  },

  add: function() {
    if(this.data.selection.length > 3) {
      return
    }
    this.data.selection.push({value: ""})
    this.setData({
      selection: this.data.selection
    })
  },

  descriptionInput: function(e) {
    this.setData({
      description: e.detail.value
    })
  },

  codeInput: function(e) {
    this.setData({
      code: e.detail.value
    })
  },

  // 答案选择
  handleChange: function(e) {
    // console.log(e)
    const num = e.detail.value
    this.setData({
      ans: this.data.selection[num]
    })
  },

  // 提交前的逻辑处理
  submit: function() {
    if(!this.data.description) {
      wx.showToast({
        title: '题目描述不能为空',
        icon: "none"
      })
      return
    }else if(this.data.selection.some(item => item.value === "")) {
      wx.showToast({
        title: '有题目选项为空',
        icon: "none"
      })
    }else if(!this.data.ans) {
      wx.showToast({
        title: '请选择正确答案',
        icon: "none"
      })
    }
    // 提交
    wx.cloud.callFunction({
      name: "uploadQuestion",
      data: this.data,
      success: res => {
        console.log(res)
      }
    })
  },

  confirm: function() {
    wx.showModal({
      title: '尚未有内容编辑完成',
      content: '是否退出',
      success: res => {
        if(res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
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