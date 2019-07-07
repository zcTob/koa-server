const router = require('./index')
const { TopicCRUD } = require("../mongodb/topic");
const ObjectId = require('mongodb').ObjectId
const topic = new TopicCRUD();
router.post("/topic", async ctx => {
  const login = ctx.cookies.get("user") === "zhangyu" ? true : false;
  if (login) {
    const res = await topic.insertTopic({
      title: ctx.request.body.title,
      text: ctx.request.body.text,
    });

    ctx.response.body = {
      code: 10000,
      msg: "文章发表成功"
    };
  } else {
    ctx.status = 401;
    ctx.response.body = {
      code: 10001,
      msg: "请核验身份"
    };
  }
});

router.get('/topic', async ctx => {
  const data = await topic.findTopic()
  ctx.response.body = {
    code: 10000,
    data: data
  }
})

router.get('/topic/:id', async (ctx, next) => {
  const id = ctx.params.id
  const data = await topic.findTopic({
    _id: ObjectId(id)
  })
  ctx.response.body = {
    code: 10000,
    data: data
  }
})

router.delete('/topic/:id', async (ctx) => {
  const id = ctx.params.id
  await topic.deleteTopic({
    _id: ObjectId(id)
  })
  ctx.response.body = {
    code: 10000,
    data: "删除成功"
  }
})

router.put('/topic', async (ctx) => {
  const id = ctx.params.id
  const data = ctx.request.body
  const query = {
    _id: ObjectId(data.id)
  }
  const newData = {
    title: data.title,
    text: data.text,
  }
  const result = await topic.updateTopic(query, newData)
  if (result.result.n === 1) {
    ctx.response.body = {
      code: 10000,
      data: "更新成功"
    }
  } else {
    ctx.status = 500
    ctx.response.body = {
      code: 10000,
      data: "更新失败"
    }
  }

})

module.exports = router;
