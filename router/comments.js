const router = require("./index")
const { TopicCRUD } = require("../mongodb/topic")
const ObjectId = require("mongodb").ObjectId
const topic = new TopicCRUD()

router.post("/comments", async ctx => {
  const data = ctx.request.body
  console.log(data)
  const query = {
    _id: ObjectId(data.id)
  }
  const newData = {
    comments: data
  }

  const result = await topic.updateTopic(query, newData, {
    $push: newData
  })
  console.log("result")
  // console.log(result)
  if (result.result.ok === 1) {
    ctx.response.body = {
      code: 10000,
      data: "评论成功"
    }
  } else {
    ctx.status = 500
    ctx.response.body = {
      code: 10001,
      data: "评论失败， 请稍后再试"
    }
  }
})

module.exports = router
