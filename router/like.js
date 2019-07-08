const router = require('./index')
const { TopicCRUD } = require("../mongodb/topic");
const ObjectId = require('mongodb').ObjectId
const topic = new TopicCRUD();

router.post('/like', async (ctx) => {
  const data = ctx.request.body
  const query = {
    _id: ObjectId(data.id)
  }
  const newData = {
    like: (data.like + 1)
  }

  const result = await topic.updateTopic(query, newData)
  console.log(result);
  if (result.result.n === 1) {
    ctx.response.body = {
      code: 10000,
      data: "点赞成功"
    }
  } else {
    ctx.status = 500
    ctx.response.body = {
      code: 10001,
      data: "点赞失败"
    }
  }

})

module.exports = router;