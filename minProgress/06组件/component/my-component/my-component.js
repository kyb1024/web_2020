// component/my-component/my-component.js

/**
 * 初始化构建组件的方法
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // count: Number // String/Boolean/Object
    count: {  // 对外需求
      type: Number,
      value: 5
    }
  },

  /**
   * 组件的初始数据
   */
  data: {  // 对内的,内部使用或者计算
    value: "hello"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handletap: function(e) {
      // console.log(e)
      const myEventDetail = {name: "detail"}  // detail对象,提供给事件监听函数
      const myEventOption = {name: "option"}  // 触发事件的选项
      this.triggerEvent("myevent", myEventDetail, myEventOption)
    }
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {
    attached: function () {  // 在组件实例进入页面节点树时执行

    },

    ready: function () {  // 在组件在视图层布局完成后执行
      console.log(this.data.count)
    },

  },

pagelifetimes: {
  resize: function(size) {  // 页面尺寸发生改变的监听,size 尺寸

  },
  show: function () {  // 组件所在的页面被展示时执行

  },
  hide: function () {  // 组件所在的页面被隐藏时执行

  }
}

// 组件的数据通信,组件内部数据要和外部数据进行通信?
// 1.属性传递数据
// 2.事件传输数据

})
