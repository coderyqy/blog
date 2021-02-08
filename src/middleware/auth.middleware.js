const jwt = require("jsonwebtoken")
const errorType = require("../constants/error-type")

// 验证token
const verifyAuth = async (ctx, next) => {
  // 1.在请求头中获取token
  const authorization = ctx.headers.authorization
  if (!authorization) { // 没有token
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  // 2.用公钥进行解密
  try {
    const result = jwt.verify(token, config.PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = result
  } catch (err) {
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

module.exports = {
  verifyAuth
}