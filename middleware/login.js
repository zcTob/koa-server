module.exports = async (ctx, next) => {
  const user = ctx.cookies.get("user")
  if (user) {
    next()
  } else {
    ctx.status = 401
    ctx.response.body = {
      code: 10001,
      msg: "请先登录"
    }
  }
}
