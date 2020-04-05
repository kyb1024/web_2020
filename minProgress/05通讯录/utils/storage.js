export default class Storage {
  constructor(name, keyList=[]) {
    this.name = name
    this.keyList = keyList
    this.data = wx.getStorageSync(this.name) || []  // 本地存储的缓冲区
    this.save()
  }

  static combine(targetArr, arr) {
    for(let i of arr) {
      if(targetArr.every(item => item !== i)) {
        targetArr.push(i)
      }
    }
    return targetArr
  }

  // 设置数据每一项的键名
  setKey(arr) {
    this.keyList = Storage.combine(this.keyList, arr)
  }

  // 增加一条记录的方法, 传数组/对象
  add(obj) {
    let o = {}
    if(obj instanceof Array) {
      this.keyList.forEach((item, index) => {
        o[item] = obj[index] || ""
      })
    }else {
      this.keyList.forEach((item, index) => {
        o[item] = obj[item] || ""
      })
    }
    this.data.push(o)
    return this
  }

  // 保存数据
  save() {
    wx.setStorageSync(this.name, this.data)
  }

  // 查询
  find(key, value) {
    // return this.data.find(item => item[key] === value)  // 满足条件的第一条数据
    return this.data.filter(item => item[key] === value)
  }

  // 模糊查询
  like(key, value) {
    let reg = new RegExp(value)
    return this.data.filter(item => reg.test(item[key]))
  }

  // 删除
  del(key, value) {
    this.data = this.data.filter(item => item[key] !== value)
    this.save()
  }
  delObj(obj) {
    this.data = this.data.filter(item => {
      return JSON.stringify(item) !== JSON.stringify(obj)
    })
    this.save()
  }

  // 获取所有的值
  getAll() {
    return this.data
  }
}