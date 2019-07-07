const Koa = require("koa");
const static = require("koa-static");
const path = require("path");
const logger = require("koa-logger");
const koaBody = require("koa-body");
const app = new Koa();
const userRouter = require("./router/user");
const topicRouter = require("./router/topic");
const uploadRouter = require("./router/upload");
const router = require("./router")
app.use(static(path.join(__dirname, "./static")));
app.use(logger());
app.use(koaBody({
  multipart: true
}));

app.use(async (ctx, next) => {
  if(ctx.header.origin === "http://www.hellozhangyu.top") {
    ctx.set("Access-Control-Allow-Origin", "http://www.hellozhangyu.top");
  }
  if(ctx.header.origin === "http://localhost:3000") {
    ctx.set("Access-Control-Allow-Origin", "http://localhost:3000");
  }
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  ctx.set("Access-Control-Allow-Credentials", "true")
  await next();
});
app.use(userRouter.routes());
app.use(topicRouter.routes());
app.use(uploadRouter.routes());
app.use(router.allowedMethods());


app.on("error", (err, ctx) => {
  console.log("server error", err, ctx);
});

app.listen(3001);
