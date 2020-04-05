// 组件的公共行为和数据

let behavior2 = Behavior({
  data: {
    content: "behavior2"
  },
  methods: {
    say: function () {
      console.log(this.data.content)
    }
  }
})

export default behavior2