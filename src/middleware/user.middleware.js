const { getUserByName } = require("../service/user.service")
const md5password = require("../utils/password-handle")

const verifyUser = async (ctx, next) => {
  let { name, password } = ctx.request.body // 获取数据
  name = name.replace(/\s/g, '')
  password = password.replace(/\s/g, '')
  if (!name || !password || name === '' || password === '') { // 非空判断
    ctx.body = "信息不能为空"
    return
  }

  const result = await getUserByName(name)
  if (result.length == 0) {
    ctx.body = "该用户名可以注册"
  } else {
    ctx.body = "该用户已经注册"
    return
  }

  await next()
}

// 调用加密方法
const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  console.log(ctx.request.body.password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}