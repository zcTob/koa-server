const router = require("./index")
const path = require("path")
const fs = require("fs")
router.post("/upload/img", async (ctx) => {
  const file = ctx.request.files.file
  // 创建可读流
  const reader = fs.createReadStream(file.path)
  // 修改文件的名称
  var myDate = new Date()
  var newFilename = myDate.getTime() + "." + file.name.split(".")[1]
  var targetPath =
    path.join(__dirname, "../static/api/imgs/") + `/${newFilename}`
  //创建可写流
  const upStream = fs.createWriteStream(targetPath)
  // 可读流通过管道写入可写流
  reader.pipe(upStream)
  ctx.response.body = {
    code: 10000,
    data: {
      url: `/imgs/${newFilename}`
    }
  }
})

module.exports = router
