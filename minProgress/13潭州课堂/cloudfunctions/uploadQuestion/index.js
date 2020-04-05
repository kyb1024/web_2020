// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const questionColection = db.collection("question")

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  let result = await questionColection.add({
    data: event
  })

  return {
    result
  }
}