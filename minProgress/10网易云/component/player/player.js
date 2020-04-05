// component/player/player.js
// 全局的音频组件

// 抽象一个类来控制音频处理全局方法
import Player from "../../utils/player.js"

const player = new Player(getApp().globalData.backgroundAudioManager)

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songid: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    state: "paused"  // 播放状态是否为暂停
  },

  /**
   * 组件的方法列表
   */
  methods: {
    play() {
      if(this.data.state === "play") {
        console.log(this.data.state)
        player.pause()
        this.data.state = "paused"
        return ;
      }
      // 根据id获取音乐地址
      const requrl = "http....../?id="
      wx.request({
        url: requrl + this.id,
        success: res => {
          // 设置播放相关信息
          player.setInfo(res.data.data[0])
          player.play()
          this.data.state = "play"      
        }
      })
    }
  },

  lifetimes: {
    attached: function() {
      console.log(getApp().globalData.backgroundAudioManager)
    }
  },

  // 监听id发生改变做出响应调整: 切换歌曲,播放
  observers: {
    "songid": function(id) {
      console.log(id)
    }
  }
})
