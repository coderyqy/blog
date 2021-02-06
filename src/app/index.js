const Koa = require("koa")
const bodyParser = require('koa-bodyparser') // 用于解析json数据
const errorHandler = require('./error-handler')
const cors = require("koa2-cors")

const app = new Koa()

app.use(bodyParser())
// 1.设置跨域（对所有请求开放）
app.use(cors())

const useRoutes = require('../router')

useRoutes(app)
app.on('error', errorHandler)

module.exports = app
