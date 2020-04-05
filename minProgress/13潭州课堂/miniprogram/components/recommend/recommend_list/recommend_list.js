// components/recommend/reommend_list/recommend_list.js
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
    lessonList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached: function() {
      let promiseList = []     
      for(let i=1; i<5; i++) {
        const url = `https://open.shiguangkey.com/api/m/index/search?terminalType=5&imei=c4d96e4a-cc9c-d7df-033a-2bc99db519ff&channel=0&courseName=web%E5%89%8D%E7%AB%AF&courseType=0&pageNo=${i}&pageSize=4&onlyFree=0`
        promiseList.push(new Promise((resolve) => {
          wx.request({
            url: url,
            success: res => {
              resolve(res.data.data.courses)
            }
          })
        }))       
      }
      Promise.all(promiseList).then(res => {
        this.setData({
          lessonList: res
        })
      })
    }
  }
})
