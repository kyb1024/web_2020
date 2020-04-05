// component/my-com2/my-com2.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    content: "你好"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    say: function() {
      console.log(this.data.content,this.data.value)
    }
  }
})
