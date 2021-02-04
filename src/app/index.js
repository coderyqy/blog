const Koa = require("koa")
const bodyParser = require('koa-bodyparser') // 用于解析json数据
const errorHandler = require('./error-handler')

const app = new Koa()

app.use(bodyParser())
const useRoutes = require('../router')

useRoutes(app)
app.on('error', errorHandler)

module.exports = app
