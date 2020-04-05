// components/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    back: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: 0,
    contentHeight: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back: function() {
      this.triggerEvent("backBefore")
    }
  },

  /**
   * 生命周期
   */
  lifetimes: {
    attached: function() {
      this.setData({
        contentHeight: wx.getMenuButtonBoundingClientRect().height,
        height: wx.getMenuButtonBoundingClientRect().bottom+5
      })
      // console.log(wx.getMenuButtonBoundingClientRect())
    }
  }

})
