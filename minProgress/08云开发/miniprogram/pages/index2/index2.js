// pages/index2/index2.js
const db = wx.cloud.database()
const userInfoDB = db.collection("userinfo")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileID: "",
    name: "kyb"
  },
  /**
   * 云函数(逻辑封闭))
   * 在本地调用云服务器中的函数,传入参数,最终返回云函数中执行的结果
   */
  cloudFunction: function() {
    wx.cloud.callFunction({
      name: "sum",
      data: {
        name: "kyb",
        age: 20
      },
      complete: console.log
    })
  },

  // 上传图片到云
  uploadfile: function() {
    // 1.选择图片 2.加载到内存中 3.上传
    wx.chooseImage({
      success: (res) => {
        // console.log(res)
        const tempFilePath = res.tempFilePaths[0]
        const imgend = tempFilePath.match(/\.[^\.]+$/g)
        wx.cloud.uploadFile({
          filePath: tempFilePath,  // 添加内存中的文件地址
          cloudPath: "images/"+new Date().valueOf() + imgend,  // 指定上传到的云路径
          success: (res) => {
            console.log(res)
            this.data.fileID = res.fileID
            wx.showToast({
              title: '上传成功!',
            })
          },
          fail: console.log
        })
      },
    })
  },

  // 下载图片
  downloadfile: function() {

    // 获取该小程序下已保存的本地缓存列表
    // saveFile:fail exceeded the maximum size of the file storage limit 10M
    wx.getSavedFileList({
      success(res) {
        // console.log(res)
        res.fileList.forEach((val, index) => {
          // console.log(val, index)
          wx.removeSavedFile({  // 删除本地缓存文件
            filePath: val.filePath,
            complete(res) {
              console.log(res)
            }
          })
        })
      }
    })

    // 从云中下载图片 => 得到图片的内存地址 => 保存到本地 => 调用本地相册存储位置的选择
    const fileID = "cloud://minprogram-nsrgv.6d69-minprogram-nsrgv-1301239383/images/1581239386330.jpg"
    wx.cloud.downloadFile({  // 获取云中的图片
      fileID: fileID,
      success: res => {
        // console.log(res)
        // 返回临时文件路径
        const tempFilePath = res.tempFilePath
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: res => {
            // console.log(res)
            const saveFilePath = res.savedFilePath
            wx.saveImageToPhotosAlbum({
              filePath: saveFilePath,
            })
          },
          fail: console.log
        })
      },
      fail: console.log
    })
  },

  // 数据库的添加
  dbAdd: function() {
    userInfoDB.add({
      data: this.data,
      success: console.log,
      fail: console.log
    })
  },

  // 删除数据
  dbDelete: function() {
    userInfoDB.doc("o8vov5faYC0XQdnP9vRlrJEho2qw").remove({
      success: function(res) {
        console.log(res)
      }
    })
  },

  // 修改数据
  dbChange: function() {
    userInfoDB.doc("da51bd8c5e3fbd660cbcb70d380a7831").update({
      data: {
        name: 666
      },
      success: function(res) {
        console.log(res)
      }
    })
  },

  // 查询数据(获取一条记录)
  // dbFind: function() {
  //   userInfoDB.doc("da51bd8c5e3fbd660cbcb70d380a7831").get({
  //     success: res => {
  //       console.log(res)
  //     }
  //   })
  // }
  dbFind: function() {  // 获取多条记录
    userInfoDB.where({
      _id: "da51bd8c5e3fbd660cbcb70d380a7831"
    }).get({
      success: res => {
        console.log(res)
      }
    })
  }
  
})
// exports.main = async (event, context) => {
//   console.log(1)
//   try {
//     return await userInfoDB.where({
//       name: "kyb"
//     }).remove()
//   } catch (e) {
//     console.error(e)
//   }
// }