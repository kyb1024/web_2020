// component/tabBar/tabBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array,
    current: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //事件处理函数
    change: function (e) {
      this.setData({
        current: e.currentTarget.dataset.num
      })
      this.triggerEvent("myevent", {current: this.data.current})
    },
  }
})
