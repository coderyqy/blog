const service = require("../service/user.service")
const md5password = require("../utils/password-handle")

const verifyUser = async (ctx, next) => {
  let { name, password } = ctx.request.body // 获取数据
  name = name.replace(/\s/g, '')
  password = password.replace(/\s/g, '')
  if (!name || !password || name === '' || password === '') { // 非空判断
    ctx.body = "信息不能为空"
    return
  }

  const result = await service.getUserByName(name)
  console.log("result")
  console.log(result.length)

  if (result.length) {
    ctx.body = "已经注册"
    return
  }
  // ctx.request.body.uid = result.id
  await next()
}

const verifyUserLogin = async (ctx, next) => {
  let { name, password } = ctx.request.body // 获取数据
  name = name.replace(/\s/g, '')
  password = password.replace(/\s/g, '')
  if (!name || !password || name === '' || password === '') { // 非空判断
    ctx.body = "信息不能为空"
    return
  }

  const result = await service.getUserByName(name)
  console.log("result")
  console.log(result.length)

  if (result.length) {
    // 用户存在
    await next()
  } else {
    ctx.body = {
      code: 404,
      msg: "用户不存在"
    }
  }
}

// 调用加密方法
const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  verifyUserLogin,
  handlePassword
}

