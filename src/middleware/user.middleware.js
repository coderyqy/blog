const service = require("../service/user.service")
const md5password = require("../utils/password-handle")
const errorType = require('../constants/error-type')

const verifyUser = async (ctx, next) => {
  let { name, password } = ctx.request.body // 获取数据
  name = name.replace(/\s/g, '')
  password = password.replace(/\s/g, '')

  if (!name || !password || name === '' || password === '') { // 非空判断
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  const result = await service.getUserByName(name)
  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

const verifyUserLogin = async (ctx, next) => {
  let { name, password } = ctx.request.body // 获取数据
  name = name.replace(/\s/g, '')
  password = password.replace(/\s/g, '')
  if (!name || !password || name === '' || password === '') { // 非空判断
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  const result = await service.getUserByName(name)
  console.log(result)
  const user = result
  if (!result.length) {
    const error = new Error(errorType.USER_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  const reqPassword = md5password(password)
  if (reqPassword != user[0].password) {
    const error = new Error(errorType.USER_INFO_ERROR)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = user[0]
  await next()
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

