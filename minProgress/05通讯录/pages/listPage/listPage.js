// pages/listPage/listPage.js
// import Storage from '../../utils/srorage.js'
// const storage = new Storage("addr")
// storage.setKey(["user", "phone", "address", "remark"])
let storage = getApp().data.storage

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: storage.getAll(),
    listLength: storage.getAll().length
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.list = storage.getAll()
    this.data.listLength = storage.getAll().length
    this.setData(this.data)
  },

  search: function(e) {
    let val = e.detail.value
    this.data.list = [...new Set([...storage.like("user", val), ...storage.like("phone", val)])]
    this.setData({
      list: this.data.list
    })
  },

  jump: function() {
    wx.navigateTo({
      url: '/pages/addPerson/addPerson',
    })
  },

  jumpToDetail: function(e) {
    let data = e.target.dataset.person
    wx.navigateTo({
      url: '/pages/detail/detail?data='+encodeURI(JSON.stringify(data)),
    })
  },

  delete: function(e) {
    let data = e.target.dataset.person
    wx.showModal({
      title: `确定要删除${data.user}吗?`,
      // content: '',
      success: (res) => {
        if(res.confirm) {
          storage.delObj(data)
          this.setData({
            list: storage.getAll()
          })
        }
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