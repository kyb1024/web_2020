// components/recommend/recommend.js
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
    selectList: [],
    swiperList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpToSearch: function() {
      wx.navigateTo({
        url: '/pages/search/search',
      })
    },

    search: function(e) {
      // console.log(e)
      const keywords = e.target.dataset.keywords
      wx.navigateTo({
        url: '/pages/search/search?keywords='+keywords,
      })
    }
    
  },

  lifetimes: {
    attached: function() {
      const selectUrl = "https://open.shiguangkey.com/api/m/index/findCourseLikeName?terminalType=5&imei=c4d96e4a-cc9c-d7df-033a-2bc99db519ff&channel=0&list=3232235787&intranetIp=3232235787&courseName=web&pageIndex=0&pageSize=10"
      wx.request({
        url: selectUrl,
        success: res => {
          // console.log(res)
          this.setData({
            selectList: res.data.data.keyboard
          })
        }
      })
      const swiperUrl = "https://open.shiguangkey.com/api/m/index/listBanner?terminalType=5&imei=c4d96e4a-cc9c-d7df-033a-2bc99db519ff&channel=0"
      wx.request({
        url: swiperUrl,
        success: res => {
          this.setData({
            swiperList: res.data.data
          })
        }
      })
    }
  }
})
