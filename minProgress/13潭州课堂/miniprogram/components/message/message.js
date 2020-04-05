// components/message/message.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    chooseQuestion(e) {
      // console.log(e)
      const key = e.currentTarget.dataset.key
      wx.navigateTo({
        url: '/pages/question/question?key='+key,
      })
    }
  }
})
