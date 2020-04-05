// 组件的公共行为和数据

let behavior = Behavior({
  behavior: [],

  data: {
    content: "behavior1"
  },
  methods: {
    say: function() {
      console.log(this.data.content)
    }
  }
})

export default behavior