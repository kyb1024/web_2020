// component/my-com/my-com.js
import behavior from "../../behavior/behavior.js"
import behavior2 from "../../behavior/behavior2.js"
// console.log(behavior)

Component({

  behaviors: [behavior, behavior2],  // 对组件进行引用

  /**
   * 在组件定义时的选项中启用多slot支持
   */
  options: {
    multipleSlots: true
  },

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
    // content: "你好"
    name: "zhangsan",
    age: 18,
    wuping: {
      book: true,
      pen: false,
      price: 10,
    }
  },

  lifetimes: {
    ready: function() {
      let a = this.data.wuping.book
      this.setData({
        name: "kouyanbin",
      })
    }
  },

  // 手动监听,对数据进行观察,只要发生改变,就会做出响应行为
  // this.setData之后才会触发 observers 的观察
  observers: {
    "name, age": function(data1, data2) {
      console.log("name is changed to", data1, data2)
    },
    "**": function(field) {  // data 的对象打包
      console.log("有数据发生改变", field)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // say: function() {
    //   console.log(this.data.value, this.data.content)
    // }
  }
})
