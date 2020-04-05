// pages/index2/index2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: "",
    picList: []
  },

  /**
   * 生命周期函数--监听页面加载
   * 发送请求,获取数据
   */
  onLoad: function (options) {
    this.data.keyWord = options.value
  // 请求, 发送请求,获取内容
    wx.request({
      url: `https://image.baidu.com/search/acjson?tn=resultjson_com&catename=pcindexhot&ipn=rj&ct=201326592&is=&fp=result&queryWord=&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word=${this.data.keyWord}&face=0&istype=2&qc=&nc=1&fr=&pn=0&rn=30`,
      success: (res) => {
        this.setData({
          picList: res.data.data
        })
        wx.hideLoading()
      }
    })
  },
  back: function() {
    wx:wx.navigateBack({
      delta: 1,
    })
  },
  // 点击图片预览
  preview: function(e) {
    wx.previewImage({
      urls: this.data.picList.map(q => q.middleURL),
      current: e.target.dataset.src
    })
  },

  // 点击下载按钮下载图片
  // 1.下载到内存当中, 2.保存到本地相册
  download: function(e) {
    let url = e.currentTarget.dataset.src
    wx.downloadFile({
      url: url,
      success: function(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
      }
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