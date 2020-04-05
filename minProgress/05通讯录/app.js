//app.js
import Storage from '/utils/storage.js'
const storage = new Storage("addr")
storage.setKey(["user", "phone", "address", "remark"])

App({
  data: {
    storage: ""
  },

  onLaunch: function () {
    this.data.storage = storage
  }  
})