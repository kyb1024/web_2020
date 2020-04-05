export default class Player {
  constructor(bgctx) {
    this.bgctx = bgctx
    // 设置src
    this.src = ""
  }

  setInfo(info) {
    this.bgctx.title = "未命名"
    // 将音频地址放到播放器中
    this.bgctx.src = info.url
  }

  play() {  // 音频播放
    // 手动播放
    this.bgctx.play()
  }

  pause() {
    this.bgctx.pause()
  }
}