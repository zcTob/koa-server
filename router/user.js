const router = require('./index')

const {
  UserCRUD
} = require("../mongodb/user");
const config = require("../config")
const user = new UserCRUD();
router.post("/login", async ctx => {
  const res = await user.findUser({ username: ctx.request.body.username, password: ctx.request.body.password });
  if (res.length >= 1) {
    ctx.cookies.set('user', ctx.request.body.username, {
      domain: config.domain, 
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/',
      httpOnly: false,
      overwrite: false,
    })
    ctx.response.body = {
      code: 10000,
      data: '验证成功'
    }
  } else {
    ctx.status = 401
    ctx.response.body = {
      code: 10001,
      data: '验证失败'
    }
  }
});

router.post('/register', async ctx => {
  const {username, password} = ctx.request.body
  const res = await user.findUser({ username })
  if(res.length < 1) {
    const insertStatus = await user.insertUser({
      username,
      password
    })
    if(insertStatus.n === 1) {
      ctx.response.body = {
        code: 10000,
        data: '恭喜，注册成功'
      }
    }
  } else {
    ctx.response.body = {
      code: 10001,
      data: '账号已被注册' 
    }
  }
})

module.exports = router;
