//index.js

// localStorage的封装,基于面向对象的方式操作
import Storage from '../../utils/storage.js'

// let addrStorage = new Storage("addr1", ["name","phone"])
// addrStorage.setKey(["name","phone","address"])
// addrStorage.add([1,2]).save()
// addrStorage.add({"name":"kyb","address":"天水"}).save()

//获取应用实例
const app = getApp()
const addStorage = new Storage("addr", ["value"])
Page({
  data: {
    inputValue: "",
    list: addStorage.getAll(),
  },
  onLoad: function () {

  },
  //事件处理函数
  change: function (e) {
    this.data.inputValue = e.detail.value
  },
  add: function() {
    if(!this.data.inputValue.trim()) {
      return false
    }
    // addStorage.add([this.data.inputValue]).save()
    addStorage.add({"value":this.data.inputValue}).save()
    this.setData({
      list: addStorage.getAll()
    })
  },
  delete: function(e) {
    let value = e.target.dataset.value
    addStorage.del("value", value)
    this.setData({
      list: addStorage.getAll()
    })
  }
})
