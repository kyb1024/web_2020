// pages/addPerson/addPerson.js
// import Storage from '../../utils/srorage.js'
// const storage = new Storage("addr")
// storage.setKey(["user","phone","address","remark"])
let storage = getApp().data.storage

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        name: "user",
        chinese: "用户",
        value: ""
      }, {
        name: "phone",
        chinese: "手机号码",
        value: ""
      }, {
        name: "address",
        chinese: "地址",
        value: ""
      }, {
        name: "remark",
        chinese: "备注",
        value: ""
      }
    ]
  },

  inputChange: function(e) {
    let key = e.target.dataset.name,
        value = e.detail.value
    this.data.list.forEach(item => {
      if(item.name === key) {
        item.value = value
      }
    })
  },

  submit: function() {
    let data = this.data.list.map(item => item.value)
    storage.add(data).save()
    wx.showToast({
      title: '提交成功!',
    })
  },

})